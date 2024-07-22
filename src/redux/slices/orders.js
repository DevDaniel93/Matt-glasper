import { createSlice } from '@reduxjs/toolkit';
import { GetOrders, GetSingleOrderDetail, PostOrder, UpdateOrder } from '../service/orders.service';
import { ErrorAlert, SuccessAlert } from '../../utils/utils';




const initialState = {
    Orders: [],
    orderDetail: null,
    orderResponse: null,

};

export const getOrder = (userId) => async (dispatch) => {
    try {

        await GetOrders(userId).then(async (response) => {
            dispatch(saveOrders(response))
        }).catch((error) => {
            console.log("error===========>", error?.response?.data?.message)
        })
    } catch (error) {
        console.log("error===========>", error)
    };
};
export const getSingleOrder = (id) => async (dispatch) => {
    try {
        await GetSingleOrderDetail(id).then(async (response) => {
            dispatch(saveOrdersDetail(response))
        }).catch((error) => {
            console.log("error===========>", error?.response?.data?.message)
        })

    } catch (error) {
        console.log("error===========>", error)
    };
};


export const postOrder = (params) => async (dispatch) => {
    try {
        const response = await PostOrder(params);
        return response;
    } catch (error) {
        console.log("Order Posted error===========>", error?.response?.data?.message);
        ErrorAlert(error?.response?.data?.message);
        throw error;
        // Optionally, you could dispatch an error action here
        // dispatch(saveOrderError(error));
    }
};
export const updateOrder = (orderId, setPaid) => async (dispatch) => {
    try {
        const response = await UpdateOrder(orderId, setPaid);
        return response;
    } catch (error) {
        console.log("Order Update error===========>", error?.response?.data?.message);
        ErrorAlert(error);
        throw error;

    }
};
export const OrderSlice = createSlice({
    name: 'orders',
    initialState,
    reducers: {
        saveOrders: (state, action) => {
            state.Orders = action.payload
        },
        saveOrdersDetail: (state, action) => {
            state.orderDetail = action.payload
        },
        saveOrderResponse: (state, action) => {
            state.orderResponse = action.payload
        }




    },
});

export const { saveOrders, saveOrdersDetail, saveOrderResponse } = OrderSlice.actions;

export default OrderSlice.reducer;