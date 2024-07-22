import { Alert, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { COLORS, SCREENS, SIZES, STYLES } from '../../constants'
import EditText from '../../components/EditText'
import CustomButton from '../../components/CustomButton'
import OtpInput from '../../components/OtpInput'
import { useDispatch, useSelector } from 'react-redux'
import { getTheme } from '../../constants/theme'
import { useTranslation } from 'react-i18next'
import { VerifyOTP } from '../../redux/slices/auth'
import { setLoading } from '../../redux/slices/utils'

export default function EmailVerification(props) {
    const { navigation,route } = props
    const{userId}=route?.params
    const dispatch=useDispatch()
 
    const theme = useSelector(state => state.Theme.theme)
    const currentTheme = getTheme(theme)
    const { t } = useTranslation();
    const handleCodeFilled =async (code) => {
        try {
            dispatch(setLoading(true))
          
            const data = {
                user_id: userId,
                otp:code
            }

            const response = await dispatch(VerifyOTP(data))
            if (response?.status === true) {
              
                navigation.navigate(SCREENS.NewPassword, { title: t('New Password'),userId:userId})

            }
            dispatch(setLoading(false))

        } catch (error) {
            console.log({ error })
            dispatch(setLoading(false))

        }
    };
    return (
        <View style={[STYLES.container, { backgroundColor: currentTheme.Background }]}>
            <View style={{ flex: 1 }}>
                <Text style={[styles.heading, { color: currentTheme.defaultTextColor, }]}>

                    {t('EmailVerification')}
                </Text>
                <Text style={[styles.subHeading, { color: currentTheme.defaultTextColor, }]}>

                    {t('EnterCode')}
                </Text>
                <OtpInput codeLength={5}
                    onCodeFilled={handleCodeFilled}
                />
           

                <CustomButton
                    onPress={() => {
                        navigation.navigate(SCREENS.NewPassword, { title: t('CreatePassword') })
                    }}
                    label={t('Proceed')}
                />
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    heading: {

        fontSize: SIZES.twentyFive,
        fontWeight: "500",
        fontFamily: "Poppins",
        marginTop: SIZES.twentyFive + 10
    },
    subHeading: {
        marginTop: SIZES.ten,

        fontSize: SIZES.fifteen,
        fontWeight: "500",
        fontFamily: "Poppins"
    },

})