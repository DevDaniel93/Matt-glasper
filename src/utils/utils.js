
import Toast, { ErrorToast } from "react-native-toast-message";

export const SuccessAlert = (text1, text2) => {
    Toast.show({
        type: "success",
        text1: text1,
        text2: text2,
    })
}
export const ErrorAlert = (text1, text2) => {
    Toast.show({
        type: 'error',
        text1: text1,
        text2: text2,
    })
}
export const InfoAlert = (text1, text2) => {
    Toast.show({
        type: 'info',
        text1: text1,
        text2: text2,
    })
}

