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

    const source = {
        html: content?.msg
    };
    return (
        <View style={[STYLES.container, { backgroundColor: currentTheme.Background }]}>
            <HeaderWithArrow
                label={t('AboutUs')} />

            <RenderHtml
                contentWidth={width * 0.5}
                source={{
                    html: `
                        <div class="text-black">
                          ${content?.msg}
                        </div>
                      `
                }}
                tagsStyles={{
                    div: {
                        color: currentTheme.defaultTextColor
                    },
                    p: {
                        color: currentTheme.defaultTextColor
                    },
                    span: {
                        color: currentTheme.defaultTextColor
                    }
                }}
                classesStyles={{
                    'text-black': {
                        color: currentTheme.defaultTextColor
                    }
                }}
                renderersProps={{
                    div: {
                        style: { color: currentTheme.defaultTextColor }
                    },
                    p: {
                        style: { color: currentTheme.defaultTextColor }
                    },
                    span: {
                        style: { color: currentTheme.defaultTextColor }
                    }
                }}
            />
        </View>
    )
}

const styles = StyleSheet.create({})