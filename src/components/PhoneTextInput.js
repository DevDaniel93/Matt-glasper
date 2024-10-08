import React, { useRef, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import PhoneInput from 'react-native-phone-number-input';
import { COLORS, SIZES } from '../constants';
import { useSelector } from 'react-redux';
import { getTheme } from '../constants/theme';
import { label } from '../constants/lables';
import { useTranslation } from 'react-i18next';

export default function PhoneTextInput(props) {
    const { t } = useTranslation();
    const { phone, setPhone, setCountryCode, setFlag } = props;
    const theme = useSelector(state => state.Theme.theme)
    const currentTheme = getTheme(theme)
    const phoneInput = useRef(null);
    const [borderColor, setBorderColor] = useState(COLORS.charcoalGrey);

    const onSelect = country => {
        setCountryCode(
            !country?.callingCode[0]?.includes('+')
                ? `+${country?.callingCode[0]}`
                : country?.callingCode[0],
        );
        setFlag(country?.cca2)
    };

    return (
        <View>
            <Text style={[styles.textLabel, { color: currentTheme.defaultTextColor }]}> {t('PhoneNumber')} <Text style={{ color: currentTheme.red }}> *</Text></Text>
            <PhoneInput
                layout="first"
                defaultCode="US"
                ref={phoneInput}

                codeTextStyle={{ color: currentTheme.defaultTextColor }}
                defaultValue={phone}
                onChangeCountry={onSelect}
                onChangeText={text => setPhone(text)}
                textInputStyle={[styles.textInputStyle, { color: currentTheme.defaultTextColor }]}
                textContainerStyle={[styles.textContainerStyle, { backgroundColor: currentTheme.Background }]}
                countryPickerButtonStyle={{ backgroundColor: currentTheme.Background, borderTopLeftRadius: SIZES.ten, borderBottomLeftRadius: SIZES.ten }}
                containerStyle={[styles.containerStyle, { borderColor: borderColor, backgroundColor: currentTheme.Background }]}
            />

            {phone.length && !phoneInput.current?.isValidNumber(phone) ? (
                <Text style={styles.textStyle}>{t('InvalidPhoneNumber')}</Text>
            ) : null}
        </View>
    );
}

const styles = StyleSheet.create({
    textInputStyle: {
        padding: 0,
    },
    textContainerStyle: {
        borderWidth: .5,
        borderColor: COLORS.charcoalGrey,
        borderTopRightRadius: SIZES.ten,

        borderBottomRightRadius: SIZES.ten,
    },
    containerStyle: {
        height: SIZES.twentyFive * 2.3,
        width: '100%',
        borderWidth: 1,
        borderRadius: SIZES.ten,
        marginTop: SIZES.fifteen * 1.3,

    },
    textStyle: {
        color: 'red',
        fontSize: SIZES.body10,
        marginLeft: SIZES.twenty,
        marginTop: SIZES.five,
    },
    textLabel: {
        fontFamily: "Poppins",
        fontSize: SIZES.fifteen,
        fontWeight: "500",
        color: COLORS.defaultTextColor,
        marginTop: SIZES.five,
        top: SIZES.ten
    },
});