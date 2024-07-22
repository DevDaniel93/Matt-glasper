import { ImageBackground, StyleSheet, Text, View, FlatList, TouchableOpacity, ScrollView } from 'react-native'
import React, { useState } from 'react'
import CustomHeader from '../../components/CustomHeader'
import HeaderWithArrow from '../../components/HeaderWithArrow'
import { useTranslation } from 'react-i18next'
import { COLORS, IMAGES, SIZES, height } from '../../constants'
import { Icon, IconType } from '../../components'
import { useSelector } from 'react-redux'
import { DarkTheme, STYLES, getTheme, width } from '../../constants/theme'
import CustomButton from '../../components/CustomButton'


const ProductDetail = (props) => {
    const { t } = useTranslation();
    const theme = useSelector(state => state.Theme.theme)
    const currentTheme = getTheme(theme)
    const [quantity, setQuantity] = useState(0)
    const [selectedColor, setSelectedColor] = useState()
    const [wishList, setWishList] = useState(props.favourite)
    const { navigation, route } = props
    const { productDetails } = route?.params



    const renderItem = ({ item }) => {
        return (
            <TouchableOpacity style={[styles.colorOptions, { backgroundColor: item.toLowerCase(), }, item.toLowerCase() === "white" && {
                shadowColor: "#000",
                shadowOffset: {
                    width: 0,
                    height: 7,
                },
                shadowOpacity: 0.41,
                shadowRadius: 9.11,

                elevation: 14,
            }]}
                onPress={() => setSelectedColor(item)}
            >
                {selectedColor === item &&
                    <View style={[styles.selectedColor, { backgroundColor: selectedColor.toLowerCase() === "white" ? "black" : "white" }]} />}
            </TouchableOpacity>
        )
    }
    return (
        <View style={[STYLES.container, { backgroundColor: currentTheme.Background }]} >
            <HeaderWithArrow
                label={t('Details')}
            />
            <ScrollView>
                <ImageBackground
                    resizeMode='contain'
                    style={[styles?.imgContainer, { backgroundColor: currentTheme.onBackground }]}
                    source={{ uri: productDetails?.image }}>
                    <View style={styles.TxtAndRating}>
                        <View style={styles.txtView}>
                            <Text style={styles.title}>{productDetails?.title}</Text>
                            <Text style={styles.category}>{productDetails?.category}</Text>
                        </View>
                        <View style={styles.reviewContainer}>
                            <View style={{ flexDirection: "row", alignItems: "center" }}>
                                <Icon
                                    name={'star'}
                                    type={IconType.MaterialCommunityIcons}
                                    color={COLORS.golden}
                                />
                                <Text style={styles.rating}>{" "}6.5</Text>
                            </View>
                            <Text style={styles.review}>250 {t('reviews')}</Text>
                        </View>
                    </View>
                </ImageBackground>
                <View style={styles.description}>
                    <Text style={[styles.descriptionHeading, { color: currentTheme.defaultTextColor, }]}>{t('Description')}</Text>
                    <Text style={{ color: currentTheme.defaultTextColor }}>Introducing our stylish and versatile WJM Logo twill hat with leather patch – the perfect blend of fashion and functionality for any occasion. Crafted with meticulous attention to detail, this hat is designed to provide...</Text>
                </View>
                <View style={{ flexDirection: "row", margin: 20, alignItems: "center" }}>
                    <Text style={[styles.descriptionHeading, { color: currentTheme.defaultTextColor }]}>{t('Color')}</Text>
                    <FlatList
                        style={{ right: 10 }}
                        data={productDetails.attributes.color}
                        renderItem={renderItem}
                        horizontal
                        scrollEnabled={false}
                    />
                    <View style={{ flexDirection: "row", alignItems: "center", backgroundColor: COLORS.primary, borderRadius: 10 }}>
                        <TouchableOpacity style={[styles.btn, { borderColor: currentTheme.defaultTextColor }]}
                            onPress={() => {
                                if (quantity !== 0) {
                                    setQuantity(quantity - 1)
                                }
                            }}
                        >
                            <Icon
                                name={"minus"}
                                type={IconType.Entypo}
                                color={COLORS.black}
                            />
                        </TouchableOpacity>
                        <Text style={[styles.quantityText, { color: currentTheme.defaultTextColor, }]}>
                            {quantity}
                        </Text>
                        <TouchableOpacity style={[styles.btn, { borderColor: currentTheme.defaultTextColor }]}
                            onPress={() => setQuantity(quantity + 1)}
                        >
                            <Icon
                                name={"plus"}
                                type={IconType.Entypo}
                                color={COLORS.black}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{ flexDirection: "row", justifyContent: "space-around", alignItems: 'center', bottom: 10 }}>
                    <TouchableOpacity
                        style={styles.favIcon}
                        onPress={() => setWishList(!wishList)}
                    >
                        <Icon
                            name={wishList ? "heart" : "heart-outlined"}
                            type={IconType.Entypo}
                            color={wishList ? COLORS.red : COLORS.black}
                            size={SIZES.twenty + 3}
                        />
                    </TouchableOpacity>
                    <CustomButton label={t('AddToCart')} btnStyle={{ width: "60%", borderRadius: 10 }} icon={{ name: 'shoppingcart', type: IconType.AntDesign, color: COLORS.black }} />
                </View>
            </ScrollView>
        </View>
    )
}

export default ProductDetail

const styles = StyleSheet.create({
    imgContainer: {
        height: height * .5,
        // backgroundColor: COLORS.backgroundGray,
        margin: SIZES.twentyFive,
        borderRadius: 20
    },
    TxtAndRating: {
        backgroundColor: COLORS.backgroundColor,
        flexDirection: "row",
        // justifyContent: "space-between",
        position: "absolute",
        bottom: 0,
        left: 10,

    },
    txtView: {
        // backgroundColor: "pink",
        width: "65%"
    },
    title: {
        fontSize: SIZES.fifteen + 3,
        fontWeight: "700",
        color: COLORS.white,
        margin: 10,
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: { width: 2, height: 2 },
        textShadowRadius: 5,
    },
    category: {
        fontSize: SIZES.fifteen + 2,
        fontWeight: "500",
        color: COLORS.white,
        marginHorizontal: 10,
        marginBottom: 10,
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: { width: 2, height: 2 },
        textShadowRadius: 5,

    },
    reviewContainer: {
        backgroundColor: COLORS.primary,
        height: "100%",
        width: "35%",
        borderWidth: 10,
        borderColor: COLORS.white,
        borderRadius: 20,
        alignItems: "center",
        justifyContent: "center"
    },
    rating: {
        fontSize: SIZES.fifteen + 3,
        fontWeight: "700",
        color: COLORS.white,
    },
    review: {
        fontSize: SIZES.ten + 2,
        color: COLORS.white,
    },
    description: {
        margin: 20
    },
    descriptionHeading: {
        fontSize: SIZES.fifteen + 3,
        fontWeight: "700",
        color: COLORS.defaultTextColor,
        marginBottom: 10,
        marginRight: 30
    },
    btn: {
        padding: SIZES.five,
        margin: SIZES.five,
        borderRadius: SIZES.five,
        borderWidth: .5,
        backgroundColor: COLORS.white
    },
    quantityText: {
        fontSize: SIZES.twenty,
        marginHorizontal: SIZES.ten,
        fontWeight: "600"
    },
    favIcon: {
        // paddingHorizontal: SIZES.fifteen,
        borderRadius: SIZES.twentyFive,
        backgroundColor: COLORS.white,
        width: 40,
        height: 40,
        alignItems: "center",
        justifyContent: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 7,
        },
        shadowOpacity: 0.43,
        shadowRadius: 9.51,

        elevation: 15,
    },
    colorOptions: {
        height: 30,
        width: 30,
        marginHorizontal: 10,
        borderRadius: 20,
        alignItems: "center",
        justifyContent: "center"
    },
    selectedColor: {
        height: 15,
        width: 15,
        borderRadius: 30
    }
})