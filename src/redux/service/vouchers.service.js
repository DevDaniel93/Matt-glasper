import axios from "axios";
import { CONSTANTS } from "../../constants";

export const GetVoucher = (data) => {
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
            search:data
            
        },
    }
    return axios.get(
        CONSTANTS.API_URLS.BASE + CONSTANTS.API_URLS.APPLY_VOUCHER,
        options
    ).then(onSuccess)
        .catch(onFailure);
};
