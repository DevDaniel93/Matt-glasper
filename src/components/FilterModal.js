import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Slider from 'react-native-slider';
import { useDispatch, useSelector } from 'react-redux';
import { Modalize } from 'react-native-modalize';
import { COLORS, FONTS, height, SIZES } from '../constants';
import Icon, { IconType } from './Icons';
import CustomButton from './CustomButton';
import { getTheme, IMAGES } from '../constants/theme';
import { useTranslation } from 'react-i18next';
import Categories from './Categories';
import { getFilterProducts, getProducts } from '../redux/slices/products';
import { setLoading } from '../redux/slices/utils';



export default function FilterModal(props) {
    const { modalizeRef, onApply, onCancel, onResetAll } = props;
    const dispatch = useDispatch()
    const theme = useSelector(state => state.Theme.theme)
    const currentTheme = getTheme(theme)
    const { t } = useTranslation();
    const categories = useSelector(state => state?.categories?.categories)
    const user = useSelector(state => state.Auth.user)

    const [minprice, setMinPrice] = useState(1);
    const [maxprice, setMaxPrice] = useState(1);
    const [selectedCategory, setSelectedCategory] = useState(null);


    const onReset = () => {
        setMaxPrice(1);
        setMinPrice(1);
        setSelectedCategory(null);
        onResetAll()
        onCancel()

    };

    const checkDisabled = () => {
        if ((minprice < maxprice) || selectedCategory !== null) {
            return false;
        } else {
            return true;
        }
    };

    const RenderHeader = () => (
        <View style={styles.headerStyle}>
            <View style={{ flex: 0.2 }}>
                <Icon
                    name="x"
                    type={IconType.Octicons}
                    onPress={onCancel}
                    style={{
                        color: currentTheme.defaultTextColor,
                        fontSize: SIZES.twentyFive * 1.1,
                    }}
                />
            </View>

            <View style={{ flex: 1, alignItems: 'center' }}>
                <Text style={[FONTS.boldFont22, { color: currentTheme.defaultTextColor }]}>Filter</Text>
            </View>

            <TouchableOpacity
                onPress={onReset}
                style={{ flex: 0.2, alignItems: 'flex-end' }}>
                <Text style={[FONTS.mediumFont14, { color: currentTheme.defaultTextColor }]}>Reset</Text>
            </TouchableOpacity>
        </View>
    );

    const getPro = async () => {
        try {
            dispatch(setLoading(true))
            const params = {
                ...(selectedCategory !== null && { category: selectedCategory }),
                ...(user !== null && { user_id: user?.user_id }),
                ...(minprice > 1 && { min_price: minprice }),
                ...(maxprice > 1 && { max_price: maxprice }),
            }
            const page = 1

            const response = await dispatch(getFilterProducts(page, params))

            onApply(response)

            dispatch(setLoading(false))

        } catch (error) {
            dispatch(setLoading(false))

            console.log("error when try to get product by category")
        }
    }

    return (
        <Modalize
            ref={modalizeRef}
            withHandle={false}
            modalHeight={height * 0.7}
            modalStyle={[styles.modalStyle, { backgroundColor: currentTheme.Background }]}
            HeaderComponent={<RenderHeader />}
            scrollViewProps={{ showsVerticalScrollIndicator: false }}>

            <View style={{ marginTop: SIZES.twentyFive }}>
                <Text style={[FONTS.mediumFont18, { color: currentTheme.defaultTextColor }]}>{t("Minimum Price")}</Text>
                <Slider
                    step={1}
                    value={minprice}
                    minimumValue={1}
                    maximumValue={5000}
                    trackStyle={{ height: 2.5 }}
                    thumbTintColor={COLORS.primary}
                    maximumTrackTintColor={currentTheme.defaultTextColor}
                    minimumTrackTintColor={COLORS.primary}
                    onValueChange={val => setMinPrice(val)}
                    style={styles.sliderStyle}
                />
                <View style={styles.flexRow}>
                    <Text style={[FONTS.mediumFont12, { color: currentTheme.defaultTextColor }]}>
                        ${minprice}
                    </Text>
                    <Text style={[FONTS.mediumFont12, { color: currentTheme.defaultTextColor }]}>
                        $5,000
                    </Text>
                </View>
            </View>
            <View style={{ marginTop: SIZES.twentyFive }}>
                <Text style={[FONTS.mediumFont18, { color: currentTheme.defaultTextColor }]}>{t("Maximum Price")}</Text>
                <Slider
                    step={1}
                    value={maxprice}
                    minimumValue={1}
                    maximumValue={5000}
                    trackStyle={{ height: 2.5 }}
                    thumbTintColor={COLORS.primary}
                    maximumTrackTintColor={currentTheme.defaultTextColor}
                    minimumTrackTintColor={COLORS.primary}
                    onValueChange={val => setMaxPrice(val)}
                    style={styles.sliderStyle}
                />
                <View style={styles.flexRow}>
                    <Text style={[FONTS.mediumFont12, { color: currentTheme.defaultTextColor }]}>
                        ${maxprice}
                    </Text>
                    <Text style={[FONTS.mediumFont12, { color: currentTheme.defaultTextColor }]}>
                        $5,000
                    </Text>
                </View>
            </View>
            <Categories hide={true} data={categories} onPress={(item) => {
                setSelectedCategory(item?.id)
            }} />


            <CustomButton
                label="Apply"
                onPress={() => {
                    onCancel();
                    getPro()
                    // onReset();
                }}
                btnStyle={styles.btnStyle}
                disabled={checkDisabled()}
            />
            <View style={{ height: height * .13 }} />

        </Modalize>
    );
}

const styles = StyleSheet.create({
    modalStyle: {
        paddingVertical: SIZES.twenty,
        paddingHorizontal: SIZES.twenty,
        borderTopLeftRadius: SIZES.twentyFive,
        borderTopRightRadius: SIZES.twentyFive,

    },
    headerStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    flexRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    sliderStyle: {
        width: '100%',
        marginTop: SIZES.ten,
    },
    itemsContainer: {
        flexWrap: 'wrap',
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: SIZES.twenty,
    },
    itemStyle1: {
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: COLORS.primary,
        borderRadius: SIZES.fifteen,
        paddingVertical: SIZES.fifteen,
        paddingHorizontal: SIZES.twenty,
        backgroundColor: COLORS.primary,
        marginRight: SIZES.twentyFive,
        marginBottom: SIZES.twentyFive,
    },
    itemStyle2: {
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: COLORS.gray,
        borderRadius: SIZES.fifteen,
        paddingVertical: SIZES.fifteen,
        paddingHorizontal: SIZES.twenty,
        backgroundColor: COLORS.white,
        marginRight: SIZES.twentyFive,
        marginBottom: SIZES.twentyFive,
    },

});

