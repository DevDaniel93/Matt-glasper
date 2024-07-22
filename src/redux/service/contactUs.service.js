import axios from "axios";
import { CONSTANTS } from "../../constants";

export const contactUs = (data) => {

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
            Accept: "application/json"

        },
    }


    return axios.post(
        CONSTANTS.API_URLS.BASE + CONSTANTS.API_URLS.CONTACT_US,
        data,
        options
    ).then(onSuccess)
        .catch(onFailure);
};