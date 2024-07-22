import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { SCREENS, SIZES, STYLES } from '../../constants'
import EditText from '../../components/EditText'
import CustomButton from '../../components/CustomButton'
import { useDispatch, useSelector } from 'react-redux'
import { COLORS, getTheme } from '../../constants/theme'
import { useTranslation } from 'react-i18next'
import { login } from '../../redux/slices/auth'
import { setLoading } from '../../redux/slices/utils'
import { useNavigation } from '@react-navigation/native'


export default function Login(props) {
    // const { navigation } = props
    const theme = useSelector(state => state.Theme.theme)
    const currentTheme = getTheme(theme)
    const [email, setEmail] = useState(__DEV__ ? 'iqra@yopmail.com' : "")
    const [password, setPassword] = useState(__DEV__ ? '123123123' : "")
    const { t } = useTranslation();
    const dispatch = useDispatch()
    const navigation = useNavigation()



    const onLogin = async () => {
        try {
            dispatch(setLoading(true))

            const response = await dispatch(login(email, password))
            console.log("response", response?.status)
            if (response?.status === true) {

                navigation.reset({
                    index: 0,
                    routes: [{ name: SCREENS.Drawer }],
                });
            }
            dispatch(setLoading(false))

        } catch (error) {
            console.log({ error })
            dispatch(setLoading(false))

        }
    }

    return (
        <View style={[STYLES.container, { backgroundColor: currentTheme.Background, flexGrow: 1 }]}>
            <View style={{}}>
                <Text style={[styles.heading, { color: currentTheme.secondary }]}>
                    {t('Login')}
                </Text>
                <Text style={[styles.subHeading, { color: currentTheme.defaultTextColor, }]}>
                    {t('NoAccount')}

                    <Text
                        onPress={() => { navigation.navigate(SCREENS.SignUp) }}
                        style={{ color: currentTheme.primary, fontWeight: "600" }}>
                        {" "}
                        {t('Signup')}

                    </Text>
                </Text>
                <EditText
                    value={email}
                    label={t('Email')}
                    onChangeText={(e) => {
                        setEmail(e)
                    }}
                    required
                />
                <EditText
                    value={password}

                    label={t('Password')}
                    password
                    onChangeText={(e) => {
                        setPassword(e)
                    }}

                    required
                />
                <TouchableOpacity
                    onPress={() => navigation.navigate(SCREENS.ConfirmationMail, { title: t('ForgotPassword') })}
                >
                    <Text style={[styles.forget, { color: currentTheme.primary, }]}>

                        {t('ForgotPassword')}

                    </Text>
                </TouchableOpacity>

                <CustomButton
                    onPress={() => onLogin()}

                    label={t('Login')}
                />
                <CustomButton
                    txtstyle={{ color: COLORS.primary }}
                    btnStyle={[styles.btnStyle1, { backgroundColor: currentTheme.Background }]}
                    label={t('Continue as guest')}
                    onPress={() => {
                        navigation.navigate(SCREENS.Drawer)
                    }}
                />

            </View>
            <View
                style={{ flex: 1, justifyContent: "flex-end" }}
            >
                <Text style={[styles.bottamText, { color: currentTheme.defaultTextColor, }]}>
                    {t('YouAgreeToOur')}
                    <Text
                        onPress={() => {
                            navigation.navigate(SCREENS.privacyPolicy)
                        }}
                        style={{ color: currentTheme.primary }}>{" "}{t('PrivacyPolicy')}{" "}
                    </Text>


                    {t('And')}

                    <Text
                        onPress={() => {
                            navigation.navigate(SCREENS.termAndCondition)
                        }}
                        style={{ color: currentTheme.primary }}>

                        {" "}{t('TermsAndConditions')}{" "}
                    </Text>
                </Text>
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    heading: {

        fontSize: SIZES.twentyFive + 3,
        fontWeight: "500",
        fontFamily: "Poppins",

        marginTop: SIZES.fifty * 1.5
    },
    subHeading: {
        marginTop: SIZES.ten,

        fontSize: SIZES.twenty - 2,
        fontWeight: "500",
        fontFamily: "Poppins"
    },
    forget: {

        fontFamily: "Poppins",
        fontSize: SIZES.fifteen + 1,
        fontWeight: "600",
        alignSelf: "flex-end",
        marginTop: SIZES.twenty,
        marginBottom: SIZES.fifteen
    },
    bottamText: {
        fontWeight: "400",
        fontFamily: "Poppins",
        textAlign: "center",
        marginBottom: SIZES.twenty,
        fontSize: SIZES.fifteen + 1
    },
    btnStyle1: {
        borderWidth: 1,
        borderColor: COLORS.primary,

    },
})