import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Icon, { IconType } from './Icons'
import { COLORS } from '../constants'
import { useSelector } from 'react-redux'
import { getTheme } from '../constants/theme'
import { label } from '../constants/lables'
import { useTranslation } from 'react-i18next'

const ProgressBar = (props) => {
    const { mode } = props
    const { t } = useTranslation();
    const theme = useSelector(state => state.Theme.theme)
    const currentTheme = getTheme(theme)
    return (
        <View style={styles.container}>
            <View style={styles.icon}>
                <Icon type={IconType.Feather} name={'package'} color={mode === 0 ? currentTheme.defaultTextColor : currentTheme.secondary} />
                <Text style={{ color: mode === 0 ? currentTheme.defaultTextColor : currentTheme.secondary }}>{t('Shipping')}</Text>
            </View>
            <View style={styles.line} />
            <View style={styles.icon}>
                <Icon type={IconType.MaterialCommunityIcons} name={'credit-card-check-outline'} color={mode === 0 ? currentTheme.gray : mode === 1 ? currentTheme.defaultTextColor : currentTheme.secondary} />
                <Text style={{ color: mode === 0 ? currentTheme.gray : mode === 1 ? currentTheme.defaultTextColor : currentTheme.secondary }}>{t('Review')}</Text>
            </View>
            <View style={styles.line} />
            <View style={styles.icon}>
                <Icon type={IconType.Ionicons} name={'bag-check-outline'} color={mode === 0 || mode === 1 ? currentTheme.gray : COLORS.black} />
                <Text style={{ color: mode === 0 || mode === 1 ? currentTheme.gray : currentTheme.defaultTextColor }}>{t('Payment')}</Text>
            </View>
        </View>
    )
}

export default ProgressBar

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: "space-evenly",
        padding: 20
    },
    icon: {
        alignItems: "center"
    },
    line: {
        width: 60,
        height: 1,
        backgroundColor: COLORS.lightGray,
        alignSelf: "center"

    }
})