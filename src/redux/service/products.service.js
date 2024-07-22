import axios from "axios";
import { CONSTANTS } from "../../constants";

export const Getproducts = (page, params) => {

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
            category: params?.category,
            status: 'publish',
            per_page: 10,
            page: page,
            max_price: params?.max_price,
            min_price: params?.min_price,
            user_id: params?.user_id
        },
    }
    return axios.get(
        CONSTANTS.API_URLS.BASE + CONSTANTS.API_URLS.ALL_PRODUCT,
        options
    ).then(onSuccess)
        .catch(onFailure);
};
export const GetVariation = (productId) => {

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

            status: 'publish',
            stock_status: "instock"
        },
    }
    return axios.get(
        CONSTANTS.API_URLS.BASE + CONSTANTS.API_URLS.GET_VARIATION + productId + "/variations",
        options
    ).then(onSuccess)
        .catch(onFailure);
};
export const AddToFav = (FormData) => {

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
        CONSTANTS.API_URLS.BASE + CONSTANTS.API_URLS.ADD_TO_FAV,
        FormData,
        options
    ).then(onSuccess)
        .catch(onFailure);
};

export const GetFavProducts = (userId) => {

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
            user_id: userId
        },

    }
    return axios.get(
        CONSTANTS.API_URLS.BASE + CONSTANTS.API_URLS.GET_FAV,
        options
    ).then(onSuccess)
        .catch(onFailure);
};
