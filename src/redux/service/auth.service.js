import axios from "axios";
import { CONSTANTS } from "../../constants";
const FormData = require('form-data');


const login = (email, password) => {

    const requestData = {
        login: email,
        password: password,
    }

    const onSuccess = ({ data }) => {
        return data;
    };

    const onFailure = error => {
        throw error;
    };
    const options = {
        params: {
            consumer_key: CONSTANTS.API_URLS.Consumer_key,
            consumer_secret: CONSTANTS.API_URLS.Consumer_secret,

        },
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    }
    return axios.post(
        CONSTANTS.API_URLS.BASE + CONSTANTS.API_URLS.LOGIN,
        requestData,
        options
    ).then(onSuccess)
        .catch(onFailure);
};


const Register = (data) => {

    const onSuccess = ({ data }) => {
        return data;
    };

    const onFailure = error => {
        throw error;
    };
    const options = {
        params: {
            consumer_key: CONSTANTS.API_URLS.Consumer_key,
            consumer_secret: CONSTANTS.API_URLS.Consumer_secret,

        },
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    }
    return axios.post(
        CONSTANTS.API_URLS.BASE + CONSTANTS.API_URLS.REGISTER,
        data,
        options
    ).then(onSuccess)
        .catch(onFailure);
};
const VerifyEmail = (data) => {
    const onSuccess = ({ data }) => {
        return data;
    };

    const onFailure = error => {
        throw error;
    };
    const options = {
        params: {
            consumer_key: CONSTANTS.API_URLS.Consumer_key,
            consumer_secret: CONSTANTS.API_URLS.Consumer_secret,

        },
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    }

    return axios.post(
        CONSTANTS.API_URLS.BASE + CONSTANTS.API_URLS.FORGOT_PASSWORD,
        data,
        options
    ).then(onSuccess)
        .catch(onFailure);
};
const VerifyOTP = (data) => {
    const onSuccess = ({ data }) => {
        return data;
    };

    const onFailure = error => {
        throw error;
    };
    const options = {
        params: {
            consumer_key: CONSTANTS.API_URLS.Consumer_key,
            consumer_secret: CONSTANTS.API_URLS.Consumer_secret,

        },
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    }

    return axios.post(
        CONSTANTS.API_URLS.BASE + CONSTANTS.API_URLS.VERIFY_OTP,
        data,
        options
    ).then(onSuccess)
        .catch(onFailure);
};
const ResetPassword = (data) => {
    const onSuccess = ({ data }) => {
        return data;
    };

    const onFailure = error => {
        throw error;
    };
    const options = {
        params: {
            consumer_key: CONSTANTS.API_URLS.Consumer_key,
            consumer_secret: CONSTANTS.API_URLS.Consumer_secret,

        },
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    }

    return axios.post(
        CONSTANTS.API_URLS.BASE + CONSTANTS.API_URLS.RESET_PASSWORD,
        data,
        options
    ).then(onSuccess)
        .catch(onFailure);
};

const updateProfile = (data) => {

    const onSuccess = ({ data }) => {
        return data;
    };

    const onFailure = error => {
        throw error;
    };
    const options = {
        params: {
            consumer_key: CONSTANTS.API_URLS.Consumer_key,
            consumer_secret: CONSTANTS.API_URLS.Consumer_secret,
        },
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    }


    return axios.post(
        CONSTANTS.API_URLS.BASE + CONSTANTS.API_URLS.UPDATE_PROFILE,
        data,
        options
    ).then(onSuccess)
        .catch(onFailure);
};
const changePassword = (data) => {

    const onSuccess = ({ data }) => {
        return data;
    };

    const onFailure = error => {
        throw error;
    };
    const options = {
        params: {
            consumer_key: CONSTANTS.API_URLS.Consumer_key,
            consumer_secret: CONSTANTS.API_URLS.Consumer_secret,
        },
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    }

    return axios.post(
        CONSTANTS.API_URLS.BASE + CONSTANTS.API_URLS.CHANGE_PASSWORD,
        data,
        options
    ).then(onSuccess)
        .catch(onFailure);
};
const deleteAccount = (data) => {

    const onSuccess = ({ data }) => {
        return data;
    };

    const onFailure = error => {
        throw error;
    };
    const options = {
        params: {
            consumer_key: CONSTANTS.API_URLS.Consumer_key,
            consumer_secret: CONSTANTS.API_URLS.Consumer_secret,
        },
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    }

    return axios.post(
        CONSTANTS.API_URLS.BASE + CONSTANTS.API_URLS.DELETE_ACCOUNT,
        data,
        options
    ).then(onSuccess)
        .catch(onFailure);
};

const authService = {
    login,
    Register,
    VerifyEmail,
    VerifyOTP,
    ResetPassword,
    updateProfile,
    changePassword,
    deleteAccount
};

export default authService;