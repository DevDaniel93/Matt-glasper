import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { COLORS, SIZES, STYLES } from '../constants'
import { useSelector } from 'react-redux'
import { getTheme } from '../constants/theme'

export default function ShadedBox(props) {
    const theme = useSelector(state => state.Theme.theme)
    const currentTheme = getTheme(theme)
    return (
        <View style={[styles.container, {
            backgroundColor: currentTheme.Background,
            borderColor: currentTheme.primary,

        }, STYLES.shadow, props.style]}>
            {props?.children}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: SIZES.fifteen,
        borderRadius: SIZES.ten,

        borderWidth: 1,
        borderTopWidth: 4,
        backgroundColor: COLORS.white,
        marginVertical: SIZES.ten,

    }
})