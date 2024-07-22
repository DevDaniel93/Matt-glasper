import { FlatList, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { COLORS, SIZES, STYLES } from '../../constants'
import HeaderWithArrow from '../../components/HeaderWithArrow'
import { useSelector } from 'react-redux'
import { getTheme, width } from '../../constants/theme'
import { useTranslation } from 'react-i18next'
import RenderHtml from 'react-native-render-html';
export default function TermAndCondition() {
    const theme = useSelector(state => state.Theme.theme)
    const currentTheme = getTheme(theme)
    const { t } = useTranslation();
    const content = useSelector(state => state.Content.termsAndCondition)
    console.log("about", content)
    const source = {
        html: content?.msg
    };

    return (
        <View style={[STYLES.container, { backgroundColor: currentTheme.Background }]}>
            <HeaderWithArrow
                label={t('TermsAndConditions')}
            />

            <RenderHtml
                contentWidth={width}
                source={source}
            />

        </View>
    )
}

const styles = StyleSheet.create({
    contentArea: {
        marginTop: SIZES.fifteen
    },
    labelText: {
        fontWeight: "bold",
        fontSize: SIZES.twenty - 2,

        marginBottom: SIZES.five

    }, content: {
        fontSize: SIZES.fifteen,

    }
})