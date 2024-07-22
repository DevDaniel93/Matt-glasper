import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { SIZES, STYLES, height, width } from '../../constants'
import HeaderWithArrow from '../../components/HeaderWithArrow'
import EditText from '../../components/EditText'
import CustomButton from '../../components/CustomButton'
import { useDispatch, useSelector } from 'react-redux'
import { getTheme } from '../../constants/theme'
import { useTranslation } from 'react-i18next'
import { Contactus } from '../../redux/slices/contactUs'
import { setLoading } from '../../redux/slices/utils'

export default function ContactUs() {
    const theme = useSelector(state => state.Theme.theme)
    const { t } = useTranslation();
    const currentTheme = getTheme(theme)
    const dispatch = useDispatch()
    const user = useSelector(state => state.Auth.user)
    const [name, setName] = useState(user !== null ? user?.first_name : "")
    const [email, setEmail] = useState(user !== null ? user?.email : "")
    const [subject, setSubject] = useState("")
    const [message, setMessage] = useState("")


    const sendQuery = async () => {
        try {

            const formData = new FormData()
            formData.append("name", name)
            formData.append("email", email)
            formData.append("subject", subject)
            formData.append("message", message)
            dispatch(setLoading(true))
            await dispatch(Contactus(formData))
            dispatch(setLoading(false))
            setSubject('')
            setMessage('')

        } catch (error) {
            dispatch(setLoading(false))

        }
    }
    return (
        <View style={[STYLES.container, { backgroundColor: currentTheme.Background }]}>
            <HeaderWithArrow
                label={t('ContactUs')}
            />
            <EditText
                editable={user !== null ? false : true}
                value={name}
                onChangeText={setName}
                styleTxtArea={styles.textArea}
                placeholder={t('EnterYourName')}
            />
            <EditText
                editable={user !== null ? false : true}
                styleTxtArea={styles.textArea}
                value={email}
                onChangeText={setEmail}
                placeholder={t('EnterYourEmail')}

            />
            <EditText
                value={subject}
                onChangeText={setSubject}
                styleTxtArea={styles.textArea}
                placeholder={t('EnterYourSubject')}

            />
            <EditText
                value={message}
                onChangeText={setMessage}
                styleTxtArea={styles.textArea}
                inputArea={styles.multiInput}
                multiline={true}
                style={styles.multiInputTxt}
                placeholder={t('EnterYourMessage')}
            />
            <CustomButton
                onPress={sendQuery}
                label={t('Submit')}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    textArea: {
        marginTop: SIZES.twenty
    },
    multiInput: {
        height: height * .28,
        flex: 1
    },
    multiInputTxt: {
        height: height * .27,
        textAlignVertical: "top"
    }

})