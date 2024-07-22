import { createSlice } from '@reduxjs/toolkit';
import React from 'react'
export const themeSlice = createSlice({
    name: 'theme',
    initialState: {
        theme: 'Dark',
        modal: false
    },
    reducers: {
        toggleTheme: (state, action) => {
            state.theme = action.payload
        },
        showFilter: (state, action) => {
            state.modal = true
        },
        hideFilter: (state, action) => {
            state.modal = false
        },


    },
});

export const { toggleTheme, showFilter, hideFilter } = themeSlice.actions;

export default themeSlice.reducer;