import { FlatList, Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { COLORS, FONTFAMILY, IMAGES, SIZES, STYLES, height, width } from '../../constants'
import ShadedBox from '../../components/ShadedBox'
import HeaderWithArrow from '../../components/HeaderWithArrow'
import { useSelector } from 'react-redux'
import { getTheme } from '../../constants/theme'
import { useTranslation } from 'react-i18next'
import moment from 'moment'

export default function OrderDetails(props) {
    const { navigation, route } = props
    const { data } = route?.params

    const theme = useSelector(state => state.Theme.theme)
    const currentTheme = getTheme(theme)
    const { t } = useTranslation();
    const ShippingDetails = [
        { key: t('FirstName'), value: data?.billing?.first_name },
        { key: t('LastName'), value: data?.billing?.last_name },
        { key: t('MobileNumber'), value: data?.billing?.phone },
        { key: t('State'), value: data?.billing?.state },
        { key: t('City'), value: data?.billing?.city },
        { key: t('StreetAddress'), value: data?.billing?.address_1 },
        { key: t('PostalCode'), value: data?.billing?.postcode },
    ]

    const renderItem = ({ item }) => (
        <View style={styles.rows}>
            <Text style={[styles.infoTxt, { color: currentTheme.gray, }]}>{item.key}</Text>
            <Text style={[styles.infoTxt, { color: currentTheme.gray, }]}>{item.value}</Text>
        </View>
    );

    const ProductList = ({ item }) => {

        return (
            <View style={styles.ProductListRow}>
                <Image source={{ uri: item?.image?.src }} style={[styles.img, STYLES.shadow]} />
                <View style={{ justifyContent: "space-around", margin: SIZES.twentyFive, }}>
                    <Text numberOfLines={1} style={[styles.productText, { color: currentTheme.defaultTextColor, }]}>
                        {/* {t('IAmHim')} */}{item?.name}
                    </Text>
                    <Text style={[styles.productText, { color: currentTheme.defaultTextColor, }]}>
                        {t('Quantity')}:{item?.quantity}
                    </Text>
                    <Text style={[styles.productText, { fontWeight: "bold", color: currentTheme.primary }]}>
                        {t('UnitPrice')}: ${item?.subtotal}
                    </Text>

                </View>
            </View>
        )
    }
    return (
        <View style={[STYLES.container, { backgroundColor: currentTheme.Background }]}>
            <HeaderWithArrow
                label={t('OrderDetails')}
            />
            <ScrollView
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.row}>
                    <ShadedBox style={styles.box}>
                        <Text style={[styles.txt, { color: currentTheme.defaultTextColor, }]}>
                            {t('OrderNumber')}
                        </Text>
                        <Text style={[styles.txt, { color: currentTheme.defaultTextColor, }]}>
                            #{data?.id}
                        </Text>
                    </ShadedBox>
                    <ShadedBox style={styles.box}>
                        <Text style={[styles.txt, { color: currentTheme.defaultTextColor, }]}>
                            {t('OrderDate')}
                        </Text>
                        <Text style={[styles.txt, { color: currentTheme.defaultTextColor, }]}>

                            {moment(data?.date_created).format('MMM DD, YYYY')}

                        </Text>
                    </ShadedBox>
                </View>
                <ShadedBox style={styles.statusBox}>
                    <Text style={[styles.txt, { color: currentTheme.defaultTextColor, }]}>
                        {t('OrderStatus')}
                    </Text>
                    <Text style={[styles.txt, { color: currentTheme.defaultTextColor, }]}>
                        {data?.status}
                    </Text>
                </ShadedBox>
                <View style={styles.dotLine} />
                <Text style={[styles.heading, { color: currentTheme.defaultTextColor, }]}>
                    {t('ShippingDetails')}
                </Text>
                <View>
                    <FlatList
                        showsVerticalScrollIndicator={false}
                        data={ShippingDetails}
                        renderItem={renderItem}
                        keyExtractor={(item) => item.key}
                        contentContainerStyle={styles.container}
                    />
                </View>

                <View style={styles.dotLine} />
                <View>
                    <FlatList
                        showsVerticalScrollIndicator={false}
                        data={data?.line_items || []}
                        renderItem={ProductList}
                        keyExtractor={(item) => item.key}
                        contentContainerStyle={styles.container}
                    />
                </View>
                <View style={styles.totalRow}>
                    <Text style={[styles.infoTxt, { color: currentTheme.gray }]}>

                        {t('ShippingCost')}

                    </Text>
                    <Text style={[styles.infoTxt, { color: currentTheme.gray }]}>
                        ${data?.shipping_total}
                    </Text>
                </View>
                {/* <View style={styles.totalRow}>
                    <Text style={[styles.infoTxt, { color: currentTheme.gray }]}>
                        {t('Sub_Total')}
                    </Text>
                    <Text style={[styles.infoTxt, { color: currentTheme.gray }]}>
                        ${data?.shipping_total}
                    </Text>
                </View> */}
                <View style={[styles.totalRow, { marginBottom: SIZES.twenty }]}>
                    <Text style={[styles.infoTxt, { color: currentTheme.defaultTextColor, fontSize: SIZES.twenty, fontWeight: "bold" }]}>
                        {t('Total')}
                    </Text>
                    <Text style={[styles.infoTxt, { color: currentTheme.defaultTextColor, fontSize: SIZES.twenty, fontWeight: "bold" }]}>
                        ${data?.total}
                    </Text>
                </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    box: {
        width: width * .43,
        justifyContent: "center",
        alignItems: "center"
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-between"
    },
    txt: {

        fontSize: SIZES.fifteen,
        fontWeight: "500",
        marginTop: 3
    },
    statusBox: {
        justifyContent: "center",
        alignItems: "center"
    },
    dotLine: {
        borderWidth: 1,
        borderStyle: "dashed",
        marginVertical: SIZES.fifteen,
        borderColor: COLORS.gray
    },
    heading: {

        fontWeight: "600",
        fontSize: SIZES.twenty,
        fontFamily: FONTFAMILY.Poppins
    },
    rows: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: SIZES.fifteen
    },
    infoTxt: {
        fontSize: SIZES.fifteen,
    },
    ProductListRow: {
        flexDirection: "row",
        paddingVertical: SIZES.ten,
        borderBottomWidth: 1
    },
    img: {
        width: width * .22,
        height: height * .14,

        borderRadius: SIZES.five,
        resizeMode: "contain"
    },
    productText: {
        fontSize: SIZES.twenty - 3,

        fontFamily: FONTFAMILY.Poppins,
        fontWeight: "500"
    },
    totalRow: {
        marginTop: SIZES.fifteen,
        flexDirection: "row",
        justifyContent: "space-between"
    }
})