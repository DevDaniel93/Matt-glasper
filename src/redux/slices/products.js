import { createSlice } from '@reduxjs/toolkit';
import { AddToFav, GetFavProducts, Getproducts, GetVariation } from '../service/products.service';
import { getCategories } from './categories';
import { SuccessAlert } from '../../utils/utils';



const initialState = {
    products: [],
    filterProduct: []

};

export const getProducts = (page, params) => async (dispatch) => {

    try {

        const response = await Getproducts(page, params);
        return response
        // await Getproducts(page, params).then(async (response) => {
        //     await dispatch(getCategories())
        //     // dispatch(saveProducts(response))
        //     dispatch(saveProducts(response))
        // }).catch((error) => {
        //     console.log("error===========>", error)
        // })


    } catch (error) {
        console.log("error===========>", error)
    };
};
export const getVariation = (productId) => async (dispatch) => {
    try {

        const response = await GetVariation(productId);
        return response

    } catch (error) {
        console.log("error===========>", error)
    };
};
export const getFilterProducts = (page, params) => async (dispatch) => {
    try {
        const response = await Getproducts(page, params);
        return response
        // await Getproducts(page, params).then(async (response) => {

        //     // dispatch(saveFilterProduct(response))
        //     dispatch(saveProducts(response))

        // }).catch((error) => {
        //     console.log("error===========>", error)
        // })


    } catch (error) {
        console.log("error===========>", error)
    };
};
export const getFavProduct = (userId) => async (dispatch) => {
    try {
        const response = await GetFavProducts(userId);
        return response

    } catch (error) {
        console.log("error===========>", error?.response)
    };
};
export const addToFav = (FormData) => async (dispatch) => {
    try {

        await AddToFav(FormData).then(async (response) => {
            SuccessAlert(response?.msg)

        }).catch((error) => {
            console.log("error===========>", error)
            // console.log("error===========>", error?.response)
        })


    } catch (error) {
        console.log("error===========>", error)
    };
};



export const ProductSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        // saveProducts: (state, action) => {
        //     state.products = [...state.products, ...action.payload];
        // },
        saveProducts: (state, action) => {
            const newProducts = action.payload.filter(newProduct =>
                !state.products.some(existingProduct => existingProduct.id === newProduct.id)
            );
            state.products = [...state.products, ...newProducts];
        },
        saveFilterProduct: (state, action) => {
            state.filterProduct = action.payload;
        },



    },
});

export const { saveProducts, saveFilterProduct } = ProductSlice.actions;

export default ProductSlice.reducer;