import { createSlice } from '@reduxjs/toolkit';
import authService from '../service/auth.service';
import { ErrorAlert, SuccessAlert } from '../../utils/utils';

const initialState = {
    token: null,
    user: null
};


export const login = (email, password) => async (dispatch) => {
    try {
        const response = await authService.login(email, password);
        SuccessAlert(response?.msg);
        await dispatch(saveProfile(response?.user));
        return response; // Return the response from authService.login

    } catch (error) {
        ErrorAlert(error.response?.data?.msg || "An error occurred");
        throw error; // Re-throw the error to propagate it back to caller
    }
};

export const Register = (data) => async (dispatch) => {
    try {
        const response = await authService.Register(data);

        SuccessAlert(response?.msg);
        return response;

    } catch (error) {
        // console.log("error===>",error?.response?.data)
        ErrorAlert(error.response?.data?.msg || "An error occurred");
        throw error; // Re-throw the error to propagate it back to caller
    }
};
export const VerifyEmail = (data) => async (dispatch) => {
    try {
        const response = await authService.VerifyEmail(data);

        SuccessAlert(response?.msg);
        return response;

    } catch (error) {
        // console.log("error===>",error?.response?.data)
        ErrorAlert(error.response?.data?.msg || "An error occurred");
        throw error; // Re-throw the error to propagate it back to caller
    }

};
export const VerifyOTP = (data) => async (dispatch) => {
    try {
        const response = await authService.VerifyOTP(data);

        SuccessAlert(response?.msg);
        return response;

    } catch (error) {
        // console.log("error===>",error?.response?.data)
        ErrorAlert(error.response?.data?.msg || "An error occurred");
        throw error; // Re-throw the error to propagate it back to caller
    }

};
export const ResetPassword = (data) => async (dispatch) => {
    try {
        const response = await authService.ResetPassword(data);

        SuccessAlert(response?.msg);
        return response;

    } catch (error) {
        // console.log("error===>",error?.response?.data)
        ErrorAlert(error.response?.data?.msg || "An error occurred");
        throw error; // Re-throw the error to propagate it back to caller
    }

};
export const updateProfile = (data) => async (dispatch) => {
    try {
        await authService.updateProfile(data).then(async (response) => {
            console.log("response==================>", response)
            SuccessAlert(response?.msg);
            await dispatch(saveProfile(response?.user));

        }).catch((error) => {
            ErrorAlert(error.response?.data?.msg || "An error occurred");
            console.log("error", error.response)
        });
    } catch (error) {
        console.log("error===========>", error)
    };
};
export const ChangePassword = (data) => async (dispatch) => {
    try {
        await authService.changePassword(data).then(async (response) => {
            console.log("response==================>", response)
            SuccessAlert(response?.msg);

            // await dispatch(saveProfile(response?.user));

        }).catch((error) => {
            ErrorAlert(error.response?.data?.msg || "An error occurred");
            console.log("error", error)
        });


    } catch (error) {
        console.log("error===========>", error)
    };
};
export const DeleteAccount = (data) => async (dispatch) => {
    console.log({data})
    try {
        await authService.deleteAccount(data).then(async (response) => {
            console.log("response==================>", response)
            SuccessAlert(response?.msg);
            dispatch(removeProfile())
            dispatch(removeAccessToken())
            // await dispatch(saveProfile(response?.user));

        }).catch((error) => {
            ErrorAlert(error.response?.data?.msg || "An error occurred");
            console.log("error", error)
        });


    } catch (error) {
        console.log("error===========>", error)
    };
};


export const logout = () => async (dispatch) => {
    try {
        dispatch(removeProfile())
        dispatch(removeAccessToken())

    } catch (error) {
        console.log("error===========>", error)
    }
};

export const AuthSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        saveAccessToken: (state, action) => {
            state.token = action.payload
        },
        removeAccessToken: (state, action) => {
            state.token = null
        },
        saveProfile: (state, action) => {
            state.user = action.payload
        },
        removeProfile: (state, action) => {
            state.user = null
        },


    },
});

export const { saveAccessToken, removeAccessToken, saveProfile, removeProfile } = AuthSlice.actions;

export default AuthSlice.reducer;