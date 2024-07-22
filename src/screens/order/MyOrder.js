import { ActivityIndicator, FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useCallback, useState } from 'react'
import ShadedBox from '../../components/ShadedBox'
import { COLORS, FONTFAMILY, SIZES, STYLES, width } from '../../constants'
import CustomButton from '../../components/CustomButton'
import OrderCard from '../../components/OrderCard'
import HeaderWithArrow from '../../components/HeaderWithArrow'
import { useDispatch, useSelector } from 'react-redux'
import { getTheme } from '../../constants/theme'
import { useTranslation } from 'react-i18next'
import { useFocusEffect } from '@react-navigation/native'
import { getOrder } from '../../redux/slices/orders'

export default function MyOrder() {
    const theme = useSelector(state => state.Theme.theme)
    const currentTheme = getTheme(theme)
    const { t } = useTranslation();
    const Orders = useSelector(state => state.Orders.Orders)
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)
    const user = useSelector(state => state.Auth.user)

    const getOrderDetails = async () => {
        try {
            if (user !== null) {
                setLoading(true)
                await dispatch(getOrder(user?.user_id))
                setLoading(false)

            }
        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }

    useFocusEffect(
        useCallback(() => {
            getOrderDetails()
            return () => {
                // Cleanup function if needed
            };
        }, [])
    );

    const renderEmptyComponent = () => {
        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <Text style={{ color: currentTheme?.defaultTextColor, fontSize: SIZES.twenty, marginTop: SIZES.twenty }}>
                    {t('No Order found')}
                </Text>


            </View>
        )
    }
    return (
        <View style={[STYLES.container, { backgroundColor: currentTheme.Background }]}>
            <HeaderWithArrow
                label={t('MyOrders')}
            />
            {user !== null ?
                loading ?
                    <View style={{ justifyContent: "center", flex: 1 }}>
                        <ActivityIndicator size={"large"} color={currentTheme.primary} />
                    </View> :
                    <FlatList
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{ flexGrow: 1 }}
                        data={Orders}
                        keyExtractor={item => item?.id}
                        renderItem={(data) => {
                            return (
                                <OrderCard data={data} />
                            )
                        }}
                        ListEmptyComponent={renderEmptyComponent}
                    /> :
                <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                    <Text style={{ color: currentTheme?.defaultTextColor, fontSize: SIZES.twenty, marginTop: SIZES.twenty }}>
                        {t("Please Login to see your order Details")}
                    </Text>
                </View>


            }

            <View style={{ height: SIZES.fifty * 1.5 }} />
        </View>
    )
}

const styles = StyleSheet.create({


})