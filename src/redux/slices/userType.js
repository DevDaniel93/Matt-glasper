import { createSlice } from '@reduxjs/toolkit';

export const userTypeSlice = createSlice({
    name: 'userType',
    initialState: { value: 'User' },
    reducers: {
        setUserType: (state, action) => {
            state.value = action.payload;
        },
    },
});

export const { setUserType } = userTypeSlice.actions;
export default userTypeSlice.reducer;