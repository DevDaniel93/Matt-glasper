import { Alert, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { COLORS, SCREENS, SIZES, STYLES } from '../../constants'
import EditText from '../../components/EditText'
import CustomButton from '../../components/CustomButton'
import { useDispatch, useSelector } from 'react-redux'
import { getTheme } from '../../constants/theme'
import { useTranslation } from 'react-i18next'
import { setLoading } from '../../redux/slices/utils'
import { ResetPassword } from '../../redux/slices/auth'
import { ErrorAlert } from '../../utils/utils'

export default function NewPassword(props) {
    const { navigation,route } = props
    const{userId}=route?.params
    const dispatch=useDispatch()


    const { t } = useTranslation();
    const theme = useSelector(state => state.Theme.theme)

    const currentTheme = getTheme(theme)
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
const handlePassword=async()=>{
    try {
        dispatch(setLoading(true))
      if(password!==confirmPassword){
        ErrorAlert("Password not match")
        return
      }
        const data = {
            user_id: userId,
            password:password,
            confirm_password:confirmPassword
        }

        const response = await dispatch(ResetPassword(data))
        if (response?.status === true) {
          
            navigation.navigate(SCREENS.PasswordSuccessful)
        }
        dispatch(setLoading(false))

    } catch (error) {
        console.log({ error })
        dispatch(setLoading(false))

    }
}

    return (
        <View style={[STYLES.container, { backgroundColor: currentTheme.Background, }]}>
            <View style={{ flex: 1 }}>
                <Text style={[styles.heading, { color: currentTheme.defaultTextColor, }]}>
                    {t('NewPassword')}
                </Text>
                <Text style={[styles.subHeading, { color: currentTheme.defaultTextColor, }]}>

                    {t('EnterNewPasswordAndRemember')}

                </Text>

                <EditText
                    label={t('EnterYourPassword')}
                    placeholder={t('EnterYourPassword')}
                    value={password}
                    onChangeText={(txt) => setPassword(txt)}
                    password
                    required
                />
                <EditText
                    label={t('ConfirmPassword')}
                    placeholder={t('ConfirmYourPassword')}
                    value={confirmPassword}
                    onChangeText={(txt) => setConfirmPassword(txt)}
                    password
                    required
                />
                {
                    confirmPassword !== '' && password !== confirmPassword &&
                    <Text style={[styles.notMatchTxt, { color: currentTheme.primary, }]}>
                        {t('PasswordDoNotMatch')}
                    </Text >
                }
                <CustomButton
                    btnStyle={styles.btn}
                    label={t('UpdatePassword')}
                    onPress={() => { handlePassword() }}
                />
            </View >

        </View >
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
        marginTop: SIZES.five,

        fontSize: SIZES.fifteen,
        fontWeight: "500",
        fontFamily: "Poppins",
        marginBottom: SIZES.twenty
    },
    btn: {
        marginTop: SIZES.twenty
    },
    notMatchTxt: {

        padding: 5
    }

})