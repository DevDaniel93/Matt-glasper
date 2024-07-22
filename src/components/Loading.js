import { StyleSheet, Text, View, ActivityIndicator } from 'react-native'
import React from 'react'
import Modal from 'react-native-modal';
import { COLORS } from '../constants';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { getTheme, SIZES } from '../constants/theme';
export default function Loading(props) {
    const { t } = useTranslation();
    const theme = useSelector(state => state.Theme.theme)
    const currentTheme = getTheme(theme)
    return (
        <Modal
            animationIn={'slideInUp'}
            animationOut={'slideOutDown'}
            isVisible={props.loading}>
            <ActivityIndicator size={"large"} color={currentTheme.primary} />
            <Text style={{ color: currentTheme.primary, fontWeight: "600", fontSize: SIZES.twentyFive, marginTop: SIZES.twenty, textAlign: "center" }}>
                {t('Loading')}
            </Text>
        </Modal>
    )
}

const styles = StyleSheet.create({

})