import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { STYLES } from '../../constants'
import HeaderWithArrow from '../../components/HeaderWithArrow'
import { useSelector } from 'react-redux'
import { getTheme, width } from '../../constants/theme'
import { useTranslation } from 'react-i18next'
import RenderHtml from 'react-native-render-html';
export default function AboutUs() {
    const { t } = useTranslation();
    const theme = useSelector(state => state.Theme.theme)
    const currentTheme = getTheme(theme)
    const content = useSelector(state => state.Content.about)
    console.log("about", content)
    const source = {
        html: content?.msg
    };
    return (
        <View style={[STYLES.container, { backgroundColor: currentTheme.Background }]}>
            <HeaderWithArrow
                label={t('AboutUs')} />
            <RenderHtml
                contentWidth={width}
                source={source}
            />
        </View>
    )
}

const styles = StyleSheet.create({})