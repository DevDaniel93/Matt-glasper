import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Icon, { IconType } from './Icons'
import { COLORS, FONTFAMILY, SIZES, STYLES } from '../constants'
import { useNavigation } from '@react-navigation/native'
import { useSelector } from 'react-redux'
import { getTheme } from '../constants/theme'

export default function HeaderWithArrow(props) {
    const navigation = useNavigation()
    const theme = useSelector(state => state.Theme.theme)
    const currentTheme = getTheme(theme)
    return (
        <View style={styles.row}>
            <TouchableOpacity
                onPress={() => {
                    navigation.goBack()
                }}
                style={[styles.IconContainer, STYLES.shadow, { backgroundColor: currentTheme.secondary, }]}>
                <Icon
                    name={"chevron-back"}
                    size={SIZES.twentyFive}
                    type={IconType.Ionicons}
                    color={currentTheme.black}
                />
            </TouchableOpacity>
            <Text style={[styles.text, { color: currentTheme.secondary, }]}>
                {props.label}
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    row: {
        flexDirection: "row",
        alignItems: "center",
        // marginTop: SIZES.twenty,
        marginHorizontal: SIZES.five,
    },
    IconContainer: {

        padding: SIZES.five,
        borderRadius: SIZES.fifty
    },
    text: {

        fontSize: SIZES.twenty,
        marginLeft: SIZES.fifteen,
        fontWeight: "600",
        fontFamily: FONTFAMILY.Poppins

    }
})