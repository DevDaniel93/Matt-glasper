import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import EditText from '../../components/EditText';
import PhoneTextInput from '../../components/PhoneTextInput';
import { COLORS, SIZES } from '../../constants';
import CustomDropDownPicker from '../../components/CustomDropDownPicker';
import axios from 'axios';
import { label } from '../../constants/lables';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

const Shipping = (props) => {
    const { t } = useTranslation();
    const [firstName, setFirstName] = useState(__DEV__ ? "Taimoor" : '');
    const [lastName, setLastName] = useState(__DEV__ ? "Khan" : '');
    const [state, setState] = useState('');
    const [city, setCity] = useState(__DEV__ ? "ABC CITY" : '');
    const [address, setAddress] = useState(__DEV__ ? "ABC ADDRESS" : '');
    const [postalCode, setPostalCode] = useState(__DEV__ ? "ABC123" : '');
    const country = useSelector(state => state.Shipping.countries)
    const user = useSelector(state => state.Auth.user)



    const [phone, setPhone] = useState('');
    const [countryCode, setCountryCode] = useState('+1'); // Default country code to US
    const [flag, setFlag] = useState('US'); // Default country code to US
    const [stateList, setStateList] = useState([])
    useEffect(() => {
        handleState()
        props?.onFlagChange(flag)
        props?.place_order(place_order)
    }, [flag, firstName, lastName, address, city, state, postalCode]);

    const handleState = () => {
        try {
            const filter = country.filter((item) => item.code === flag)
            setStateList(filter[0]?.states)
        } catch (error) {

        }
    }

    const place_order = {
        billing: {
            first_name: firstName,
            last_name: lastName,
            address_1: address,
            address_2: "",
            city: city,
            state: state,
            postcode: postalCode,
            country: flag,
            email: user?.email,
            phone: phone
        },
        shipping: {
            first_name: firstName,
            last_name: lastName,
            address_1: address,
            address_2: "",
            city: city,
            state: state,
            postcode: postalCode,
            country: flag
        }
    }


    return (
        <View>
            <EditText
                label={t('FirstName')}
                value={firstName}
                required
                onChangeText={(e) => {
                    setFirstName(e)
                }}
                placeholder={t('EnterYourFirstName')}
            />

            <EditText
                label={t('LastName')}
                value={lastName}
                required
                onChangeText={(e) => {
                    setLastName(e)
                }}
                placeholder={t('EnterYourLastName')}
            />
            <PhoneTextInput phone={phone}
                setFlag={setFlag}
                setPhone={setPhone}
                setCountryCode={setCountryCode} />

            <CustomDropDownPicker
                label={t('State')}
                list={stateList.map(state => ({ label: state.name, value: state.code }))}
                // list={stateList}
                required
                value={state}
                width={"100%"}
                placeholder={t('selectState')}
                zIndex={1000}
                onChangeValue={setState}
            />
            <EditText
                label={t('City')}
                value={city}
                required
                onChangeText={(value) => setCity(value)}
                placeholder={t('SelectCity')}
            />
            <EditText
                label={t('StreetAddress')}
                value={address}
                required
                onChangeText={(e) => {
                    setAddress(e)
                }}
                placeholder={t('EnterStreetAddress')}
            />
            <EditText
                label={t('PostalCode')}
                value={postalCode}
                required
                onChangeText={(e) => {
                    setPostalCode(e)
                }}
                placeholder={t('EnterPostalCode')}
            />
        </View>
    )
}

export default Shipping

const styles = StyleSheet.create({
    textInputStyle: {
        padding: 0,
    },
    countryPickerButtonStyle: {
        backgroundColor: COLORS.transparent,
    },
    textContainerStyle: {
        backgroundColor: COLORS.transparent,
    },
    containerStyle: {
        height: 65,
        width: '100%',
        borderWidth: 1,
        borderRadius: SIZES.fifteen,
        marginTop: SIZES.fifteen * 1.3,
    },
    textLabel: {
        fontFamily: "Poppins",
        fontSize: SIZES.fifteen,
        fontWeight: "500",
        color: COLORS.defaultTextColor,
        marginTop: SIZES.five,
        top: SIZES.ten
    },
    required: {
        color: COLORS.red,

    }
})