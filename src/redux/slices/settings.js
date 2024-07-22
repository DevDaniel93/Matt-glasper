import { createSlice } from '@reduxjs/toolkit';
import { setLoading } from './utils';
import { GetSettings } from '../service/settings.service';



const initialState = {
    settings: [],

};

export const getSettings = () => async (dispatch) => {
    try {
        await GetSettings().then(async (response) => {

            dispatch(saveSettings(response))
        }).catch((error) => {
            console.log("error get setting===========>",  error?.response?.data)
        })

    } catch (error) {
        console.log("error===========>", error?.response?.data)
    };
};



export const SettingsSlice = createSlice({
    name: 'settings',
    initialState,
    reducers: {
        saveSettings: (state, action) => {
            state.settings = action.payload
        },
    },
});

export const { saveSettings } = SettingsSlice.actions;

export default SettingsSlice.reducer;