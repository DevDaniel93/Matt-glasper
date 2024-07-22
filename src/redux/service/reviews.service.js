import axios from "axios";
import { CONSTANTS } from "../../constants";

export const Getreviews = (id) => {
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
            product: id

        },

    }
    return axios.get(
        CONSTANTS.API_URLS.BASE + CONSTANTS.API_URLS.ALL_REVIEWS,
        options
    ).then(onSuccess)
        .catch(onFailure);
};

export const PostReview = (fromData) => {
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
            'Content-Type': 'multipart/form-data'
        }
    }
    return axios.post(
        CONSTANTS.API_URLS.BASE + CONSTANTS.API_URLS.ALL_REVIEWS,
        fromData,
        options,

    ).then(onSuccess)
        .catch(onFailure);
};
