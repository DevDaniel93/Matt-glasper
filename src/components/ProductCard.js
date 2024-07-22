import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'

import Icon, { IconType, Icons } from './Icons'
import { COLORS, FONTFAMILY, FONTS, IMAGES, SCREENS, SIZES, STYLES, height, width } from '../constants'
import { useNavigation } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import { getTheme } from '../constants/theme'
import { addToFav } from '../redux/slices/products'

const ProductCard = ({ item, onFav }) => {
    const theme = useSelector(state => state.Theme.theme)
    const currentTheme = getTheme(theme)
    const navigation = useNavigation()
    const user = useSelector(state => state.Auth.user)
    const [fav, setFav] = useState(item?.favourite)
    const dispatch = useDispatch()

    const addtoFav = async (productId) => {
        try {
            const formData = new FormData()
            formData.append("product_id", productId)
            formData.append("user_id", user?.user_id)
            const data = {
                product_id: productId,
                user_id: user?.user_id
            }
            await dispatch(addToFav(formData))
        } catch (error) {
            console.log({ error })
        }

    }
    return (
        <TouchableOpacity onPress={() => {
            navigation.navigate(SCREENS.singleProduct, { productDetails: item })
        }}
            style={[styles.container, STYLES.shadow, { backgroundColor: currentTheme.Background, }]}>
            <Image
                style={styles.img}
                source={{ uri: item?.images[0]?.src }}
                // source={{ uri: item?.image }}

                resizeMode="cover"
            />
            <TouchableOpacity
                style={[styles.starContainer, { backgroundColor: currentTheme.white, }]}
                onPress={() => {
                    addtoFav(item?.id)
                    setFav(pre => !pre)
                    onFav(item?.id)
                }}
            >
                <Icon
                    name={fav ? "heart" : "heart-outlined"}
                    type={IconType.Entypo}
                    color={COLORS.primary}
                    size={SIZES.twenty}
                />
            </TouchableOpacity>
            <View style={[styles.detail, { backgroundColor: currentTheme.Background, }]}>
                <Text numberOfLines={1} style={[styles.txt, { color: currentTheme.defaultTextColor, }]}>
                    {item?.name}
                </Text>
                <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 2 }}>
                    {item?.on_sale ?
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={[styles.price, { marginRight: SIZES.ten, color: currentTheme.defaultTextColor, textDecorationLine: 'line-through' }]}>
                                ${item?.regular_price}
                            </Text>
                            <Text style={[styles.price, { color: currentTheme.primary, fontWeight: "700" }]}>
                                ${item?.sale_price}
                            </Text>
                        </View> :
                        <Text style={[styles.price, { color: currentTheme.defaultTextColor, }]}>
                            ${item?.price}
                        </Text>}
                    <View style={styles.rating}>
                        <Icon type={IconType.FontAwesome} name={'star'} size={18} color={COLORS.star} />
                        <Text style={[styles.txt, { color: currentTheme.defaultTextColor, marginLeft: SIZES.five }]}>{item?.average_rating}</Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    )
}

export default ProductCard

const styles = StyleSheet.create({
    container: {
        // marginTop: SIZES.ten,
        width: width * .43,
        height: height * .25,
        borderColor: COLORS.gray,
        borderWidth: .5,
        marginBottom: SIZES.twenty + 6
    },
    img: {
        width: "100%",
        height: "100%"
    },
    starContainer: {
        position: "absolute",
        padding: SIZES.five,
        borderRadius: SIZES.twentyFive,
        right: SIZES.ten,
        top: SIZES.ten
    },
    detail: {
        padding: SIZES.ten,
        borderWidth: 1,
        position: "absolute",
        bottom: -10,
        alignSelf: "center",
        width: "98%",
        borderRadius: SIZES.five,
        borderColor: COLORS.primary
    },
    txt: {
        fontFamily: FONTFAMILY.Poppins,
        fontSize: 14,
    },
    price: {
        fontFamily: FONTFAMILY.Poppins,

        fontWeight: "500",
        fontSize: 14
    },
    rating: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"
    }

})