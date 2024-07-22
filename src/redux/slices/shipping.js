import { createSlice } from '@reduxjs/toolkit';
import { GetCountries, GetShippingMethods } from '../service/shipping.service';

const initialState = {
    countries: [],
    shippingType: []

};

export const getCountries = () => async (dispatch) => {
    try {

        await GetCountries().then(async (response) => {

            dispatch(saveCountries(response))
        }).catch((error) => {
            console.log("error===========>", error?.response?.data?.message)
        })

    } catch (error) {
        console.log("error===========>", error)
    };
};
export const getShippingMethods = () => async (dispatch) => {
    try {

        await GetShippingMethods().then(async (response) => {

            dispatch(saveShippingType(response))
        }).catch((error) => {
            console.log("error Getting Shipping===========>", error?.response?.data?.message)
        })

    } catch (error) {
        console.log("error===========>", error)
    };
};



export const ShippingSlice = createSlice({
    name: 'countries',
    initialState,
    reducers: {
        saveCountries: (state, action) => {
            state.countries = action.payload
        },
        saveShippingType: (state, action) => {
            state.shippingType = action.payload
        },



    },
});

export const { saveCountries, saveShippingType } = ShippingSlice.actions;

export default ShippingSlice.reducer;