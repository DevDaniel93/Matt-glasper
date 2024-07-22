import { StyleSheet, Text, View, } from 'react-native'
import React, { useState } from 'react'
import { COLORS, SCREENS, SIZES, STYLES } from '../../constants'
import EditText from '../../components/EditText'
import CustomButton from '../../components/CustomButton'
import { useDispatch, useSelector } from 'react-redux'
import { getTheme } from '../../constants/theme'
import { useTranslation } from 'react-i18next'
import { setLoading } from '../../redux/slices/utils'
import { VerifyEmail } from '../../redux/slices/auth'
import { ErrorAlert } from '../../utils/utils'

export default function ConfirmationMail(props) {
    const { navigation } = props
    const theme = useSelector(state => state.Theme.theme)
    const dispatch = useDispatch()
    const currentTheme = getTheme(theme)
    const { t } = useTranslation();
    const [email, setEmail] = useState('')
    const onEmailVerify = async () => {
        try {
            dispatch(setLoading(true))
            if (email === '') {
                ErrorAlert("Please enter your email")
                dispatch(setLoading(false))
                return
            }

            const data = {
                email: email
            }

            const response = await dispatch(VerifyEmail(data))
            if (response?.status === true) {
              
                navigation.navigate(SCREENS.EmailVerification, { title: t('ForgotPassword'),userId:response?.user_id})

            }
            dispatch(setLoading(false))

        } catch (error) {
            console.log({ error })
            dispatch(setLoading(false))

        }
    }
    return (
        <View style={[STYLES.container, { backgroundColor: currentTheme.Background }]}>
            <View style={{ flex: 1 }}>
                <Text style={[styles.heading, { color: currentTheme.defaultTextColor, }]}>
                    {t('ConfirmationMail')}
                </Text>
                <Text style={[styles.subHeading, { color: currentTheme.defaultTextColor, }]}>
                    {t('EnterEmail')}
                </Text>
                <EditText
                    value={email}
                    onChangeText={(e) => {
                        setEmail(e)
                    }}
                    label={t('Email')}
                    required
                />

                <CustomButton
                    onPress={() => {
                        onEmailVerify()

                    }}
                    label={t('Send')}
                />
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    heading: {
        marginTop: SIZES.twenty,
        fontSize: SIZES.twenty,
        fontWeight: "500",
        fontFamily: "Poppins",

    },
    subHeading: {
        marginTop: SIZES.five,
        fontSize: SIZES.fifteen,
        fontWeight: "500",
        fontFamily: "Poppins"
    },

})