import axios from "axios";
import { CONSTANTS } from "../../constants";

export const GetSettings = () => {

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
            // group_id : "general"
        },
    }
    return axios.get(
        CONSTANTS.API_URLS.BASE + CONSTANTS.API_URLS.SETTINGS+"general",
        options
    ).then(onSuccess)
        .catch(onFailure);
};
