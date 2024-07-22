import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import ShadedBox from './ShadedBox'
import { COLORS, FONTFAMILY, SCREENS, SIZES, width } from '../constants'
import { useNavigation } from '@react-navigation/native'
import CustomButton from './CustomButton'
import { useSelector } from 'react-redux'
import { getTheme } from '../constants/theme'
import { useTranslation } from 'react-i18next'


export default function OrderCard({ data }) {


    const navigation = useNavigation()
    const theme = useSelector(state => state.Theme.theme)
    const currentTheme = getTheme(theme)
    const { t } = useTranslation();
    return (
        <ShadedBox>
            <View style={styles.row}>
                <Text style={[styles.txt, { color: currentTheme.defaultTextColor }]}>
                    {t('OrderNumber')}{" "}
                    <Text style={{ fontWeight: "600" }}>
                        #{data?.item?.id}
                    </Text>
                </Text>
                <View style={{ width: width * .3, justifyContent: "center", alignItems: "center" }}>
                    <Text style={[styles.txt, { color: currentTheme.defaultTextColor }]}>
                        {t('Status')}{"  "}
                        <Text style={{ fontWeight: "600" }}>
                            {data?.item?.status}
                        </Text>
                    </Text>
                </View>
            </View>
            <View style={styles.dotLine} />
            <View style={styles.row}>
                <Text style={[styles.txt, { color: currentTheme.defaultTextColor }]}>
                    {t('TotalPrice')}{"  "}
                    <Text style={{ fontWeight: "600" }}>
                        ${data?.item?.total}
                    </Text>
                    {" "}
                    ({data?.item?.line_items?.length} {t('Items')})
                </Text>
                <CustomButton
                    btnStyle={styles.btn}
                    onPress={() => {
                        navigation.navigate(SCREENS.OrderDetails, { data: data?.item })
                    }}
                    label={t('View')}
                />
                {/* <TouchableOpacity style={styles.btn}
                    onPress={() => {
                        navigation.navigate(SCREENS.OrderDetails)
                    }}
                >
                    <Text style={{ color: COLORS.white }}>
                        View Order
                    </Text>
                </TouchableOpacity> */}
            </View>
        </ShadedBox>
    )
}

const styles = StyleSheet.create({
    row: {

        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: 'center',
        marginRight: SIZES.fifteen,

    },
    txt: {
        fontSize: SIZES.fifteen - 1,
        fontFamily: FONTFAMILY.Poppins,
    },
    dotLine: {
        borderWidth: 1,
        borderStyle: "dashed",
        marginVertical: SIZES.fifteen,
        borderColor: COLORS.gray
    },
    btn: {
        width: width * .3,
        paddingVertical: SIZES.five,
        justifyContent: "center",
        alignItems: "center",
    }

})