import { ActivityIndicator, FlatList, Image, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'

import Stars from 'react-native-stars';
import { COLORS, FONTFAMILY, IMAGES, SIZES } from '../constants';
import Icon, { IconType } from './Icons';
import EditText from './EditText';
import CustomButton from './CustomButton';
import { useDispatch, useSelector } from 'react-redux';
import { getTheme } from '../constants/theme';
import { useTranslation } from 'react-i18next';
import { setLoading } from '../redux/slices/utils';

import { getReviews, postReviews } from '../redux/slices/Reviews';
import { ErrorAlert } from '../utils/utils';
export default function Reviews({ id }) {
    const dispatch = useDispatch()

    const [star, setStar] = useState(0)
    const [review, setReview] = useState('')
    const [loading, setLoading] = useState('')
    const theme = useSelector(state => state.Theme.theme)
    const reviews = useSelector(state => state.Review.reviews)
    const user = useSelector(state => state.Auth.user)
    const currentTheme = getTheme(theme)
    const { t } = useTranslation();
    const getReview = async () => {
        try {
            setLoading(true)
            // await dispatch(setLoading(true))
            await dispatch(getReviews(id))
            // await dispatch(setLoading(false))
            setLoading(false)

        } catch (error) {
            console.log("getting error when call get Reviews")
        }
    }
    const postReview = async () => {
        try {

            if (star === 0 || review === '') {
                ErrorAlert("Please rate the product and write the review")
            }
            else {
                const formdata = new FormData()
                formdata.append("product_id", id)
                formdata.append("reviewer", user?.username)
                formdata.append("reviewer_email", user?.email)
                formdata.append("review", review)
                formdata.append("rating", star)

                // await dispatch(setLoading(true))
                setLoading(true)

                await dispatch(postReviews(id, formdata))
                reset()
                setLoading(false)

                // await dispatch(setLoading(false))
            }
        } catch (error) {
            console.log("getting error when call post Reviews")
        }
    }
    const reset = () => {
        setReview('')
        setStar(0)
    }
    useEffect(() => {
        getReview()
    }, [])


    const CustomerReviews = ({ item }) => {
        return (
            <View style={{ paddingVertical: SIZES.ten, borderBottomWidth: 1, borderColor: currentTheme.defaultTextColor }}>
                <View style={[styles.row, { justifyContent: "space-between" }]}>
                    <View style={styles.row}>
                        <Image
                            source={{ uri: item?.reviewer_avatar_urls["48"] }}
                            style={styles.img}
                            resizeMode='contain'
                        />
                        <Text style={[styles.UserName, { color: currentTheme.defaultTextColor }]}>
                            {item?.reviewer}
                        </Text>
                    </View>
                    <Stars
                        display={item?.rating}
                        spacing={2}
                        count={5}
                        starSize={SIZES.ten}
                        disabled={true}
                        fullStar={<Icon name={'star'} type={IconType.MaterialCommunityIcons} color={COLORS.golden} />}
                        emptyStar={<Icon name={'star-outline'} type={IconType.MaterialCommunityIcons} color={COLORS.golden} />}
                        halfStar={<Icon name={'star-half'} type={IconType.MaterialCommunityIcons} color={COLORS.golden} />}
                    />
                </View>
                <Text style={[styles.txt, { color: currentTheme.defaultTextColor }]}>
                    {/* {item?.review} */}
                    {item?.review.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim()}
                </Text>

            </View>
        )
    }
    return (
        loading ?
            <View style={{ marginTop: SIZES.twenty }}>
                <ActivityIndicator size={"large"} color={COLORS.primary} />
            </View> :
            <View>
                <Text style={[styles.heading, { color: currentTheme.defaultTextColor, }]}>
                    {t('Reviews')}
                </Text>
                <View style={{ alignItems: "flex-start", marginVertical: SIZES.five }}>
                    <Stars
                        display={star}
                        spacing={8}
                        count={5}
                        starSize={SIZES.twentyFive}
                        update={(val) => { setStar(val) }}
                        disabled={false}
                        fullStar={<Icon name={'star'} type={IconType.MaterialCommunityIcons} color={COLORS.golden} />}
                        emptyStar={<Icon name={'star-outline'} type={IconType.MaterialCommunityIcons} color={COLORS.golden} />}
                        halfStar={<Icon name={'star-half'} type={IconType.MaterialCommunityIcons} color={COLORS.golden} />}
                    />
                </View>
                <EditText
                    value={review}
                    onChangeText={(e) => {
                        setReview(e)
                    }}
                    placeholder={t('WriteYourReviews')}
                    inputArea={{ borderRadius: SIZES.fifty }}
                />
                <CustomButton
                    onPress={() => {
                        postReview()
                    }}
                    label={t('AddReview')}
                />
                <FlatList
                    showsVerticalScrollIndicator={false}
                    data={reviews}
                    keyExtractor={item => { item?.id }}
                    renderItem={CustomerReviews}
                    contentContainerStyle={{ marginBottom: SIZES.twentyFive }}
                />

            </View>
    )
}

const styles = StyleSheet.create({
    heading: {

        fontSize: SIZES.twenty - 2,
        fontFamily: FONTFAMILY.Poppins,
        fontWeight: "600"
    },
    row: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center"
    },
    img: {
        width: SIZES.fifty * .9,
        height: SIZES.fifty * .9,
        borderRadius: SIZES.fifty
    },
    UserName: {
        fontWeight: "bold",

        marginLeft: SIZES.ten
    },
    txt: {
        marginVertical: SIZES.ten
    }
})