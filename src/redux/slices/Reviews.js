import { createSlice } from '@reduxjs/toolkit';
import { Getreviews, PostReview } from '../service/reviews.service';
import { getProducts } from './products';
import { SuccessAlert } from '../../utils/utils';


const initialState = {
    reviews: [],

};

export const getReviews = (id) => async (dispatch) => {
    try {

        await Getreviews(id).then(async (response) => {
            dispatch(saveReviews(response))
        }).catch((error) => {
            console.log("error===========>", error?.response?.data?.message)
        })

    } catch (error) {
        console.log("error===========>", error)
    };
};
export const postReviews = (id, fromData) => async (dispatch) => {
    try {
        await PostReview(fromData).then(async (response) => {
            SuccessAlert("Your review post successfully")
            await dispatch(getReviews(id))
            await dispatch(getProducts(1))
        }).catch((error) => {
            console.log("error===========>", error?.config?.data)
        })



    } catch (error) {
        console.log("error===========>", error)
    };
};



export const ReviewSlice = createSlice({
    name: 'review',
    initialState,
    reducers: {
        saveReviews: (state, action) => {
            state.reviews = action.payload
        },



    },
});

export const { saveReviews } = ReviewSlice.actions;

export default ReviewSlice.reducer;