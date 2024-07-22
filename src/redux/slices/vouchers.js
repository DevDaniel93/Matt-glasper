import { createSlice } from '@reduxjs/toolkit';
import { GetVoucher } from '../service/vouchers.service';
import { ErrorAlert } from '../../utils/utils';



const initialState = {
    vouchers: [],

};

export const getVoucher = (params, cart, totalAmount) => async (dispatch) => {
    try {

        await GetVoucher(params).then(async (response) => {

            if (response[0]?.product_ids?.length > 0) {

                const check = cart.some(product => response[0]?.product_ids.includes(product.id.toString()));
                if (check) {
                    dispatch(saveVoucher(response))
                }
                else {
                    ErrorAlert("Coupon is not valid for this product")
                }
            }
            else if (totalAmount >= response[0]?.minimum_amount) {
                dispatch(saveVoucher(response))
            }
            else {
                ErrorAlert("Coupon is not valid for this product")
            }


        }).catch((error) => {
            console.log("error===========>", error?.response?.data?.message)
        })


    } catch (error) {
        console.log("error===========>", error)
    };
};



export const VoucherSlice = createSlice({
    name: 'vouchers',
    initialState,
    reducers: {
        saveVoucher: (state, action) => {
            state.vouchers = action.payload
        },
        removeVoucher: (state, action) => {
            state.vouchers = []
        },



    },
});

export const { saveVoucher, removeVoucher } = VoucherSlice.actions;

export default VoucherSlice.reducer;