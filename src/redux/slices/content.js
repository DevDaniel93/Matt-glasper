import { createSlice } from '@reduxjs/toolkit';
import { GetAboutUs, GetPrivacy, GetTermAndCondition } from '../service/content.service';




const initialState = {
    termsAndCondition: null,
    privacy: null,
    about: null

};

export const getTermsAndCondition = () => async (dispatch) => {
    try {

        await GetTermAndCondition().then(async (response) => {

            dispatch(saveTerms(response))
        }).catch((error) => {
            console.log("error===========>", error?.response?.data?.message)
        })


    } catch (error) {
        console.log("error===========>", error)
    };
};
export const getPrivacyPolicy = () => async (dispatch) => {
    try {

        await GetPrivacy().then(async (response) => {
            dispatch(savePrivacy(response))
        }).catch((error) => {
            console.log("error===========>", error?.response?.data?.message)
        })

    } catch (error) {
        console.log("error===========>", error)
    };
};
export const getAbout = () => async (dispatch) => {
    try {

        await GetAboutUs().then(async (response) => {
            dispatch(saveAbout(response))
        }).catch((error) => {
            console.log("error===========>", error?.response?.data?.message)
        })

    } catch (error) {
        console.log("error===========>", error)
    };
};




export const ContentSlice = createSlice({
    name: 'Content',
    initialState,
    reducers: {
        saveTerms: (state, action) => {
            state.termsAndCondition = action.payload
        },
        saveAbout: (state, action) => {
            state.about = action.payload
        },
        savePrivacy: (state, action) => {
            state.privacy = action.payload
        },



    },
});

export const { saveTerms, saveAbout, savePrivacy } = ContentSlice.actions;

export default ContentSlice.reducer;