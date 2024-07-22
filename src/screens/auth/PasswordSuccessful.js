import { Image, ImageBackground, StyleSheet, Text, View } from 'react-native'
import React from 'react'

import CustomButton from '../../components/CustomButton'
import { COLORS, IMAGES, SCREENS, SIZES, STYLES, height, width } from '../../constants'
import { useSelector } from 'react-redux'
import { getTheme } from '../../constants/theme'
import { useTranslation } from 'react-i18next'

const PasswordSuccessful = (props) => {
    const { navigation } = props
    const theme = useSelector(state => state.Theme.theme)
    const { t } = useTranslation();
    const currentTheme = getTheme(theme)


    return (
        <View style={[STYLES.container, { backgroundColor: currentTheme.Background }]}>
            <ImageBackground
                source={IMAGES.lockBg}
                style={[styles.imgView, { backgroundColor: currentTheme.secondary, }]}>
                <Image
                    source={IMAGES.lock}
                    style={styles.img}
                    resizeMode='contain' />
            </ImageBackground>
            <Text style={[styles.heading, { color: currentTheme.defaultTextColor, }]}>
                {t('NewPasswordSetSuccessfully')}

            </Text>
            <Text style={[styles.text, { color: currentTheme.defaultTextColor, }]}>
                {t('CongratulationsPasswordSetSuccessfully')}

            </Text>
            <CustomButton
                onPress={() => {
                    navigation.navigate(SCREENS.Login)
                }}
                label={t('Login')}

            />
        </View>
    )
}

export default PasswordSuccessful

const styles = StyleSheet.create({
    imgView: {

        marginVertical: 50,
        alignSelf: 'center',
        borderRadius: 10,
        width: width * .8,
        height: height * .45,
        justifyContent: "center",
        alignItems: "center"
    },
    img: {
        width: SIZES.fiftyWidth * 5,
        height: SIZES.fifty * 4
    },
    heading: {
        textAlign: 'center',
        fontSize: SIZES.body12 * 2,

        fontWeight: "500"
    },
    text: {
        textAlign: 'center',
        fontSize: SIZES.fifteen + 2,
        margin: SIZES.twenty,

        lineHeight: 22
    }
})
