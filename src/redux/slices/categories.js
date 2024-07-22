import { createSlice } from '@reduxjs/toolkit';
import { GetCategories } from '../service/category.service';
import { setLoading } from './utils';



const initialState = {
    categories: [],

};

export const getCategories = () => async (dispatch) => {
    try {

        await GetCategories().then(async (response) => {

            dispatch(saveCategories(response))
        }).catch((error) => {
            console.log("error===========>", error)
        })

    } catch (error) {
        console.log("error===========>", error)
    };
};



export const CategorySlice = createSlice({
    name: 'categories',
    initialState,
    reducers: {
        saveCategories: (state, action) => {
            state.categories = action.payload
        },
    },
});

export const { saveCategories } = CategorySlice.actions;

export default CategorySlice.reducer;