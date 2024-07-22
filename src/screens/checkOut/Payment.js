import { StyleSheet, Text, View, Alert, FlatList, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import EditText from '../../components/EditText';
import { SIZES } from '../../constants';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { CardField, useConfirmPayment } from '@stripe/stripe-react-native';
import CustomButton from '../../components/CustomButton';
import { getTheme } from '../../constants/theme';
import { setLoading } from '../../redux/slices/utils';

const Payment = (props) => {
    const [cardDetails, setCardDetails] = useState({});
    const [cardNoAuth, setCardNoAuth] = useState('');
    const [expiryAuth, setExpiryAuth] = useState('');
    const [cvcAuth, setCvcAuth] = useState('');
    const dispatch = useDispatch();
    const payment = useSelector(state => state.Payment.payment);
    const [selectedItem, setSelectedItem] = useState(null);
    const { t } = useTranslation();
    const theme = useSelector(state => state.Theme.theme);
    const currentTheme = getTheme(theme);
    const [clientSecret, setClientSecret] = useState('');

    const { confirmPayment } = useConfirmPayment();

    useEffect(() => {
        props?.paymentMethod(selectedItem);
    }, [selectedItem]);

    const handleSelect = (item) => {
        setSelectedItem(item);
    };


    const showRadioButtons = ({ item }) => (
        <>
            <TouchableOpacity
                style={[styles.radioButton, { borderColor: selectedItem?.id === item.id ? currentTheme.primary : '#CCCCCC' }]}
                onPress={() => handleSelect(item)}
            >
                <View style={[styles.radioButtonCircle, { backgroundColor: selectedItem?.id === item.id ? currentTheme.primary + 30 : currentTheme.Background, borderColor: selectedItem?.id === item.id ? currentTheme.primary : currentTheme.defaultTextColor }]}>
                    {selectedItem?.id === item.id && <View style={[styles.radioButtonCheckedCircle, { backgroundColor: currentTheme.primary }]} />}
                </View>
                <View style={{ flexDirection: 'column' }}>
                    <Text style={{ color: selectedItem?.id === item.id ? currentTheme.primary : currentTheme.defaultTextColor }}>{item.title}</Text>
                </View>
            </TouchableOpacity>
            <Text style={{ textAlign: 'left', color: currentTheme?.defaultTextColor, paddingBottom: SIZES.twenty, fontSize: SIZES.body10, paddingHorizontal: SIZES.ten }}>{item.description !== '' ? item.description : item.method_description}</Text>
        </>
    );


    return (
        <View style={styles.container}>
            <FlatList
                data={payment}
                renderItem={showRadioButtons}
                keyExtractor={item => item.id}
                extraData={selectedItem}
            />
            {selectedItem?.id === 'stripe' ?
                <>
                    <CardField
                        postalCodeEnabled={false}
                        placeholder={{ number: '4242 4242 4242 4242' }}
                        cardStyle={{
                            borderColor: currentTheme?.defaultTextColor,
                            borderWidth: 1,
                            borderRadius: 8,
                            backgroundColor: currentTheme?.Background,
                        }}
                        style={{
                            height: SIZES.fifty,
                            marginVertical: SIZES.twentyFive,
                        }}
                        onCardChange={(cardDetails) => {
                            setCardDetails(cardDetails);
                            props.setCardDetails(cardDetails); // Pass card details up
                        }}
                    />

                </>
                :
                selectedItem?.id === "authorize_net_cim_credit_card" ?
                    <View>
                        <EditText
                            label="Card Number"
                            value={cardNoAuth}
                            onChangeText={(txt) => setCardNoAuth(txt)}
                            placeholder="4242 4242 4242 4242"
                        />
                        <EditText
                            label="Expiry"
                            value={expiryAuth}
                            onChangeText={(txt) => setExpiryAuth(txt)}
                            placeholder="2025-09"
                        />
                        <EditText
                            label="CVC"
                            value={cvcAuth}
                            onChangeText={(txt) => setCvcAuth(txt)}
                            placeholder="256"
                        />
                        <CustomButton
                            btnStyle={styles.btnStyle}
                            label={t('Payment')}
                        />
                    </View>
                    : null
            }
        </View>
    );
};

export default Payment;

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    radioButton: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        borderWidth: 1,
        borderRadius: 10,
        padding: 10
    },
    radioButtonCircle: {
        width: 20,
        height: 20,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#000',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 10,
    },
    radioButtonCheckedCircle: {
        width: 14,
        height: 14,
        borderRadius: 7,
        backgroundColor: '#000',
    },
});
