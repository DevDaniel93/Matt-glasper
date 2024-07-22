import { FlatList, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState, useEffect, useCallback } from 'react'
import { COLORS, FONTFAMILY, IMAGES, SCREENS, SIZES, STYLES, height, width } from '../../constants'
import HeaderWithArrow from '../../components/HeaderWithArrow'
import { useDispatch, useSelector } from 'react-redux'
import { Icon, IconType } from '../../components'
import { removeCartItem, selectTotalAmount, updateCartItem } from '../../redux/slices/Cart'
import { useFocusEffect } from '@react-navigation/native'
import CustomButton from '../../components/CustomButton'
import CustomModal from '../../components/CustomModal'
import LottieView from 'lottie-react-native';
import { getTheme } from '../../constants/theme'
import { useTranslation } from 'react-i18next'
import { getVoucher } from '../../redux/slices/vouchers'
import { setLoading } from '../../redux/slices/utils'
import { ErrorAlert } from '../../utils/utils'

export default function MyCart(props) {
    const { navigation } = props
    const theme = useSelector(state => state.Theme.theme)
    const currentTheme = getTheme(theme)
    const cart = useSelector(state => state.Cart.cart)
    const voucher = useSelector(state => state.Voucher.vouchers)
    const dispatch = useDispatch()
    const [isvisible, setIsvisible] = useState(false)
    const [selectCartid, setSelectCardId] = useState()
    const [quantity, setQuantity] = useState(1)
    const [voucherCode, setVoucherCode] = useState(voucher[0]?.code ? voucher[0]?.code : "")
    const [shippingCost, setShippingCost] = useState(0)
    const totalAmount = useSelector(selectTotalAmount);
    const { t } = useTranslation();


    // ================================Remove item Cart===============================
    const handleRemoveFromCart = (productId) => {
        dispatch(removeCartItem(productId));
    };


    // ================================Update Cart===============================
    const handleUpdateCartItem = (productId, newQuantity) => {
        const updatedItem = {
            id: productId,
            quantity: newQuantity,
            // Add any other updated fields here
        };

        // Dispatch the action to update the item in the cart
        dispatch(updateCartItem(updatedItem));

    };

    const ApplyVoucher = async () => {

        if (voucherCode !== "") {
            dispatch(setLoading(true))
            await dispatch(getVoucher(voucherCode, cart, totalAmount))
            dispatch(setLoading(false))
        } else {
            ErrorAlert("Enter Voucher code please")
        }

    }
    const CartItem = ({ item }) => {

        return (
            <View style={styles.CartItemRow}>
                <View style={{ flexDirection: "row" }}>
                    <Image source={{ uri: item?.image }} style={[styles.img, STYLES.shadow]} />
                    <View style={{ justifyContent: "space-around", margin: SIZES.twentyFive, }}>
                        <Text numberOfLines={2}
                            style={[styles.productText, { color: currentTheme.defaultTextColor, }]}>
                            {item?.productName}
                        </Text>
                        <Text style={[styles.productText, { color: currentTheme.defaultTextColor, }]}>
                            $ {item?.price}
                        </Text>
                        <View style={{ flexDirection: "row", alignItems: "center", marginTop: SIZES.ten }}>
                            <TouchableOpacity style={[styles.btn, { borderColor: currentTheme.defaultTextColor }]}
                                onPress={() => {
                                    if (item.quantity !== 1) {
                                        handleUpdateCartItem(item.id, item.quantity - 1)
                                    }
                                }}
                            >
                                <Icon
                                    name={"minus"}
                                    type={IconType.Entypo}
                                    color={currentTheme.defaultTextColor}
                                />
                            </TouchableOpacity>
                            <Text style={[styles.quantityText, { color: currentTheme.defaultTextColor, }]}>
                                {item.quantity}
                            </Text>
                            <TouchableOpacity style={[styles.btn, { borderColor: currentTheme.defaultTextColor }]}
                                onPress={() => handleUpdateCartItem(item.id, item.quantity + 1)}
                            >
                                <Icon
                                    name={"plus"}
                                    type={IconType.Entypo}
                                    color={currentTheme.defaultTextColor}
                                />
                            </TouchableOpacity>
                        </View>

                    </View>
                </View>
                <TouchableOpacity
                    onPress={() => {
                        setIsvisible(!isvisible)
                        setSelectCardId(item?.id)
                    }}
                    style={{ backgroundColor: COLORS.primary, justifyContent: "center", paddingHorizontal: SIZES.ten, borderRadius: SIZES.ten }}>
                    <Icon
                        name="trash-outline"
                        type={IconType.Ionicons}
                        color={COLORS.white}
                    />
                </TouchableOpacity>
            </View>

        )
    }
    return (

        <View style={[STYLES.container, { backgroundColor: currentTheme.Background }]}>
            <HeaderWithArrow
                label={t('MyCart')}
            />
            <ScrollView showsVerticalScrollIndicator={false} style={{ flexGrow: 1 }}>
                <View>
                    <FlatList
                        data={cart}
                        keyExtractor={item => item.id}
                        renderItem={CartItem}
                    />
                </View>

                <View style={styles.estArea}>
                    <Text style={{ color: currentTheme.white }}>
                        {t('EstimatedTime7days')}
                    </Text>
                </View>
                <Text style={[styles.orderInfoText, { color: currentTheme.defaultTextColor, }]}>
                    {t('OrderInfo')}
                </Text>
                <View style={styles.PricingRow}>
                    <Text style={[styles.PricingTxt, { color: currentTheme.defaultTextColor, }]}>
                        {t('SubTotal')}
                    </Text>
                    <Text style={[styles.PricingTxt, { color: currentTheme.defaultTextColor, }]}>
                        $ {Number(totalAmount).toFixed(2)}
                    </Text>
                </View>
                <View style={styles.PricingRow}>
                    <Text style={[styles.PricingTxt, { color: currentTheme.defaultTextColor, }]}>

                        {t('ShippingCost')}

                    </Text>
                    <Text style={[styles.PricingTxt, { color: currentTheme.defaultTextColor, }]}>

                        $ {Number(shippingCost).toFixed(2)}
                    </Text>
                </View>
                <View style={styles.PricingRow}>
                    <Text style={[styles.orderInfoText, { color: currentTheme.defaultTextColor, }]}>
                        {t('Total')}
                    </Text>
                    <Text style={[styles.orderInfoText, { color: currentTheme.defaultTextColor, }]}>
                        $ {Number(shippingCost + totalAmount).toFixed(2)}
                    </Text>
                </View>
                {/* Enter Voucher */}
                <View style={[styles.voucherContainer, { borderColor: currentTheme.defaultTextColor }]}>
                    <TextInput
                        placeholderTextColor={currentTheme.defaultTextColor}
                        placeholder={t('EnterVoucherCode')}
                        value={voucherCode}
                        onChangeText={(txt) => setVoucherCode(txt)}
                        editable={voucher.length === 0 ? true : false}

                    />
                    <CustomButton
                        btnStyle={{ backgroundColor: COLORS.primary, width: width * .3, justifyContent: "center", alignItems: "center", paddingVertical: SIZES.five + 2, borderRadius: SIZES.twentyFive, marginBottom: 10 }}
                        onPress={() => ApplyVoucher()}
                        disabled={voucher.length !== 0 ? true : false}
                        label={voucher.length === 0 ? t('Apply') : "$" + Math.round(voucher[0].amount)}
                    />

                </View>
                <CustomButton
                    disabled={cart.length === 0 ? true : false}
                    btnStyle={styles.btnCheckOut}
                    onPress={() => {
                        { navigation.navigate(SCREENS.checkOut, { amount: Number(shippingCost + totalAmount).toFixed(2) }) }
                    }}
                    label={t('Checkout')}
                />

                {/* =======================================delete Modal========================== */}
                <CustomModal isvisible={isvisible}>
                    <Text style={[styles.modelText, { color: currentTheme.defaultTextColor, }]}>
                        {t('AreYourSureYouWantToRemoveTheProductFromCart')}
                    </Text>
                    <LottieView
                        style={styles.lottie}
                        autoPlay={true}
                        loop={true}
                        source={{ uri: "https://lottie.host/cad44c0a-42df-41d3-b2a7-0315b6755a1d/4hxYp1Ue6b.json" }}
                    />
                    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>


                        <CustomButton btnStyle={[styles.btnStyle, { backgroundColor: currentTheme.Background }]}
                            txtstyle={{ color: COLORS.primary }}
                            onPress={() => {
                                handleRemoveFromCart(selectCartid)
                                setIsvisible(!isvisible)
                            }}
                            label={t('Yes')}
                        />
                        <CustomButton btnStyle={styles.btnStyle1}
                            label={t('No')}
                            onPress={() => {
                                setIsvisible(!isvisible)
                            }}
                        />
                    </View>

                </CustomModal>

                <View style={{ height: SIZES.fifty * 1.5 }} />
            </ScrollView>

        </View>
    )
}

const styles = StyleSheet.create({

    CartItemRow: {
        flexDirection: "row",
        paddingVertical: SIZES.ten,
        borderBottomWidth: 1,
        justifyContent: "space-between"
    },
    img: {
        width: width * .22,
        height: height * .14,

        borderRadius: SIZES.five,
        resizeMode: "contain"
    },
    productText: {
        fontSize: SIZES.twenty - 3,
        width: width * .4,
        fontFamily: FONTFAMILY.Poppins,
        fontWeight: "600"
    },
    btn: {
        padding: SIZES.five,
        borderRadius: SIZES.fifty,
        borderWidth: .5
    },
    quantityText: {


        fontSize: SIZES.twenty,
        marginHorizontal: SIZES.ten,
        fontWeight: "600"
    },
    btnCheckOut: {
        marginBottom: SIZES.twenty,
    },

    estArea: {
        backgroundColor: COLORS.primary,
        padding: SIZES.five,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: SIZES.ten,
        marginVertical: SIZES.ten
    },
    orderInfoText: {

        fontSize: SIZES.twenty,
        fontWeight: "600"
    },
    PricingRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: SIZES.ten,
        color: COLORS.black
    },
    PricingTxt: {

        fontSize: SIZES.fifteen,
        fontWeight: "500",
        fontFamily: FONTFAMILY.Poppins
    },
    voucherContainer: {
        marginTop: SIZES.ten,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderWidth: 1,
        borderRadius: SIZES.twentyFive,
        paddingHorizontal: SIZES.ten
    },
    btnStyle: {
        width: "48%",
        backgroundColor: COLORS.white,
        borderWidth: 1,
        borderColor: COLORS.primary,
        padding: SIZES.ten

    },
    btnStyle1: {
        padding: SIZES.ten,
        width: "48%"
    },
    modelText: {

        fontSize: SIZES.fifteen + 2,
        textAlign: "center",
        lineHeight: 30,
        fontWeight: "500",
        fontFamily: FONTFAMILY.Poppins
    },
    lottie: {
        width: SIZES.fifty * 3,
        height: SIZES.fifty * 3,
        alignSelf: "center"
    }
})