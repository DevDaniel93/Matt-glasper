import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { COLORS, SCREENS, SIZES, STYLES } from '../../constants'
import EditText from '../../components/EditText'
import CustomButton from '../../components/CustomButton'
import { useDispatch, useSelector } from 'react-redux'
import { getTheme } from '../../constants/theme'
import { useTranslation } from 'react-i18next'
import { setLoading } from '../../redux/slices/utils'
import { Register } from '../../redux/slices/auth'
import { ErrorAlert } from '../../utils/utils'

export default function Signup(props) {
    const { navigation } = props
    const theme = useSelector(state => state.Theme.theme)
    const dispatch = useDispatch()
    const currentTheme = getTheme(theme)
    const { t } = useTranslation();
    const [username, setUserName] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPasswrd] = useState('')

    const onSignUp = async () => {
        try {
            dispatch(setLoading(true))
            if (username === '' || firstName === '' || lastName === '' || email === '' || password === '') {
                ErrorAlert("All field Required")
                dispatch(setLoading(false))
                return
            }
            if (password !== confirmPassword) {
                ErrorAlert("Confirm Password not Match")
                dispatch(setLoading(false))
                return
            }
            const data = {
                first_name: firstName,
                last_name: lastName,
                username: username,
                email: email,
                password: password,
                confirm_password: confirmPassword
            }

            const response = await dispatch(Register(data))
            if (response?.status === true) {
                navigation.navigate(SCREENS.Login)
            }
            dispatch(setLoading(false))

        } catch (error) {
            //  console.log({error})   
            dispatch(setLoading(false))

        }
    }
    return (
        <View style={[STYLES.container, { backgroundColor: currentTheme.Background, }]}>
            <ScrollView style={{ flex: 1, }} showsVerticalScrollIndicator={false}>
                <Text style={[styles.heading, { color: currentTheme.secondary, }]}>
                    {t('Sign_Up')}
                </Text>
                <Text style={[styles.subHeading, { color: currentTheme.defaultTextColor, }]}>
                    {t('AlreadyHaveAccount')}
                    <Text
                        onPress={() => { navigation.navigate(SCREENS.Login) }}
                        style={{ color: currentTheme.primary, fontWeight: "600" }}>
                        {" "}
                        {t('Login')}
                    </Text>
                </Text>
                <EditText
                    required
                    value={username}
                    onChangeText={(e) => {
                        setUserName(e)
                    }}
                    label={t('Username')}
                    placeholder={t('EnterYourUsername')}

                />
                <EditText
                    required
                    value={firstName}
                    onChangeText={(e) => {
                        setFirstName(e)
                    }}
                    label={t('FirstName')}
                    placeholder={t('EnterYourFirstName')}

                />

                <EditText
                    required
                    value={lastName}
                    onChangeText={(e) => {
                        setLastName(e)
                    }}
                    label={t('LastName')}
                    placeholder={t('EnterYourLastName')}

                />
                <EditText
                    required
                    value={email}
                    onChangeText={(e) => {
                        setEmail(e)
                    }}
                    label={t('EnterYourEmail')}
                    placeholder={t('EnterYourEmail')}
                />
                <EditText
                    required
                    value={password}
                    onChangeText={(e) => {
                        setPassword(e)
                    }}
                    label={t('EnterYourPassword')}
                    placeholder={t('EnterYourPassword')}
                    password
                />
                <EditText
                    required
                    value={confirmPassword}
                    onChangeText={(e) => {
                        setConfirmPasswrd(e)
                    }}
                    label={t('ConfirmPassword')}
                    placeholder={t('ConfirmYourPassword')}
                    password
                />

                <CustomButton
                    onPress={() => {
                        onSignUp()
                    }}
                    label={t('Sign_Up')}
                />
            </ScrollView>

        </View>
    )
}

const styles = StyleSheet.create({
    heading: {
        color: COLORS.defaultTextColor,
        fontSize: SIZES.twentyFive + 3,
        fontWeight: "500",
        fontFamily: "Poppins",
        marginTop: SIZES.fifty * 1.5
    },
    subHeading: {
        marginTop: SIZES.ten,
        color: COLORS.defaultTextColor,
        fontSize: SIZES.twenty - 2,
        fontWeight: "500",
        fontFamily: "Poppins"
    },


})