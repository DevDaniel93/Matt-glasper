import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { COLORS, FONTFAMILY, IMAGES, SIZES } from '../constants'
import { useSelector } from 'react-redux'
import { SCREENS, getTheme } from '../constants/theme'
import { label } from '../constants/lables'
import { useTranslation } from 'react-i18next'
import { useNavigation } from '@react-navigation/native'

export default function CustomHeader() {
    const theme = useSelector(state => state.Theme.theme)
    const user = useSelector(state => state.Auth.user)
    const currentTheme = getTheme(theme)
    const { t } = useTranslation();
    const navigation = useNavigation()
    return (
        <TouchableOpacity
            onPress={() => {
                navigation.navigate(user !== null ? SCREENS.profile : SCREENS.Login)
            }}
            style={styles.container}>
            <Image
                style={[styles.img, { borderColor: currentTheme.primary, }]}
                source={user !== null ? { uri: user?.user_avatar } : IMAGES.avatar}
            />
            <View>
                <Text style={[styles.txt, { color: currentTheme.defaultTextColor, }]}>
                    {t('HelloWelcomeBack')} 👋
                </Text>
                <Text style={[styles.txt, { fontWeight: "600", color: currentTheme.secondary, }]}>
                    {user !== null ? user.username : "Guest User"}
                </Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        marginBottom: SIZES.twenty,
        flexDirection: "row",
        alignItems: "center"

    },
    img: {
        width: SIZES.fifty - 5,
        height: SIZES.fifty - 5,
        borderRadius: SIZES.fifty,
        borderWidth: 1,

        marginRight: SIZES.ten
    },
    txt: {

        fontFamily: FONTFAMILY.Poppins,
        fontSize: SIZES.fifteen
    }
})