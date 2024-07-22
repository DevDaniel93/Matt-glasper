import { createSlice } from "@reduxjs/toolkit";
import { ErrorAlert, SuccessAlert } from "../../utils/utils";
import { contactUs } from "../service/contactUs.service";

const initialState = {
    categories: [],

};
export const Contactus = (data) => async (dispatch) => {
    try {
        const response = await contactUs(data);

        SuccessAlert(response?.msg);
        return response;

    } catch (error) {
        console.log(error.response?.data)
        ErrorAlert(error.response?.data?.msg || "An error occurred");
        throw error; // Re-throw the error to propagate it back to caller
    }
};
export const ContactUsSlice = createSlice({
    name: 'contactUs',
    initialState,
    reducers: {

    },
});

export const { } = ContactUsSlice.actions;

export default ContactUsSlice.reducer;