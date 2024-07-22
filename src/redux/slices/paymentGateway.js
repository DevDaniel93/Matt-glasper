import { createSlice } from '@reduxjs/toolkit';
import { GetPayment, GetPayPalKey } from '../service/paymentGateway.service';



const initialState = {
    payment: [],
    paypal: [],

};

export const getPayment = (params) => async (dispatch) => {
    try {

        await GetPayment(params).then(async (response) => {
            const filterPayment = response.filter(items => items.enabled === true && items.title !== 'Link');
            dispatch(savePayment(filterPayment))
            filterPayment.map(async (item) => {
                if (item?.title === "PayPal") {
                    await GetPayPalKey().then((res) => {

                        dispatch(savePayPalKeys(res?.paypal_key))
                    })
                }
            })
        }).catch((error) => {
            console.log("error===========>", error?.response?.data?.message)
        })

    } catch (error) {
        console.log("error===========>", error)
    };
};



export const PaymentSlice = createSlice({
    name: 'payment',
    initialState,
    reducers: {
        savePayment: (state, action) => {
            state.payment = action.payload
        },
        savePayPalKeys: (state, action) => {
            state.paypal = action.payload
        },



    },
});

export const { savePayment, savePayPalKeys } = PaymentSlice.actions;

export default PaymentSlice.reducer;