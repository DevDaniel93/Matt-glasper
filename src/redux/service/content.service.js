import axios from "axios";
import { CONSTANTS } from "../../constants";

export const GetTermAndCondition = () => {
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
            content_type: "terms_and_conditions"
        },

    }
    return axios.get(
        CONSTANTS.API_URLS.BASE + CONSTANTS.API_URLS.GET_CONTENT,
        options
    ).then(onSuccess)
        .catch(onFailure);
};


export const GetPrivacy = () => {
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
            content_type: "privacy_policy"

        },

    }
    return axios.get(
        CONSTANTS.API_URLS.BASE + CONSTANTS.API_URLS.GET_CONTENT,
        options
    ).then(onSuccess)
        .catch(onFailure);
};


export const GetAboutUs = () => {
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
            content_type: "about_us"

        },

    }
    return axios.get(
        CONSTANTS.API_URLS.BASE + CONSTANTS.API_URLS.GET_CONTENT,
        options
    ).then(onSuccess)
        .catch(onFailure);
};

