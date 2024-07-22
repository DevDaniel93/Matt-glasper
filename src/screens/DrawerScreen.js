import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { label } from '../constants/lables'
import { useTranslation } from 'react-i18next';

export default function DrawerScreen({ navigation }) {
    const { t } = useTranslation();
    return (
        <View>
            <TouchableOpacity
                onPress={() =>
                    navigation.openDrawer()
                }
            >
                <Text>
                    {t('OpenDrawer')}
                </Text>
            </TouchableOpacity>
        </View >
    )
}

const styles = StyleSheet.create({})