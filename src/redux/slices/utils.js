import { createSlice } from '@reduxjs/toolkit';

export const utilsSlice = createSlice({
    name: 'utils',
    initialState: {
        loading: false
    },
    reducers: {
        setLoading: (state, action) => {
            state.loading = action.payload
        },


    },
});

export const { setLoading } = utilsSlice.actions;

export default utilsSlice.reducer;