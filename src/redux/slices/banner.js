import { createSlice } from '@reduxjs/toolkit';
import { GetBanner } from '../service/banner.service';



const initialState = {
    banners: [],

};

export const getBanner = (params) => async (dispatch) => {
    try {
        await GetBanner(params).then(async (response) => {
            dispatch(saveBanner(response?.banners))
        }).catch((error) => {
            console.log("error===========>", error?.response?.data?.message)
        })


    } catch (error) {
        console.log("error===========>", error)
    };
};



export const BannerSlice = createSlice({
    name: 'banner',
    initialState,
    reducers: {
        saveBanner: (state, action) => {
            state.banners = action.payload
        },



    },
});

export const { saveBanner } = BannerSlice.actions;

export default BannerSlice.reducer;