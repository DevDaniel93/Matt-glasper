import { Dimensions, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
export const { width, height } = Dimensions.get("window");
/* * Colors * */
export const COLORS = {
    defaultTextColor: "#000000",
    defaultBtnColor: "#ffffff",
    lightBackground: "#ffffff",
    darkBackground: "#000000",
    primary: "#FF856A",
    purple: "#4e1789",
    lightPurple: "#871af6",
    Background: "#24262b",
    darkPurple: "#382649",
    purpleShade: "#3c225d",
    textGrey: "#8a7e9a",
    textColor: "#B46BFF",
    brownGray: "#5d536a",
    black: "#000000",
    white: "#ffffff",
    blue: "#0037c1",
    gray: "#767577",
    star: "#FFD700",
    golden: "#FFD700",
    trueGreen: "#1eaf08",
    halfWhite: "#eeeeee",
    charcoalGrey: "#4a4b4d",
    veryLightpink: "#ffeef2",
    transparent: "transparent",
    pink: "#d323a0",
    red: "#FF0000",
    cyan: '#21D4B4',
    lightGray: '#C0C0C0',
    backgroundGray: "#DCDCDC",
    yellowTxt: "#FFBF00",
};

export const LightTheme = {
    defaultTextColor: "#000000",
    defaultBtnColor: "#ffffff",
    Background: "#ffffff",
    onBackground: '#f7f5f5',
    darkBackground: "#000000",
    primary: "#FF856A",
    secondary: "#C8ADEF",
    purple: "#4e1789",
    lightPurple: "#871af6",
    darkPurple: "#382649",
    purpleShade: "#3c225d",
    textGrey: "#8a7e9a",
    textColor: "#B46BFF",
    brownGray: "#5d536a",
    black: "#000000",
    white: "#ffffff",
    blue: "#0037c1",
    gray: "#767577",
    star: "#FFD700",
    golden: "#FFD700",
    trueGreen: "#1eaf08",
    halfWhite: "#eeeeee",
    charcoalGrey: "#4a4b4d",
    veryLightpink: "#ffeef2",
    transparent: "transparent",
    pink: "#d323a0",
    red: "#FF0000",
    cyan: '#21D4B4',
    lightGray: '#C0C0C0',
    statusBarColor: 'dark-content',
    statusBarStyle: "#ffffff"
};
export const DarkTheme = {
    defaultTextColor: "#ffffff",
    defaultBtnColor: "#ffffff",
    Background: "#24262b",
    onBackground: '#363841',
    primary: "#FF856A",
    secondary: "#C8ADEF",
    purple: "#4e1789",
    lightPurple: "#871af6",
    darkPurple: "#382649",
    purpleShade: "#3c225d",
    textGrey: "#8a7e9a",
    textColor: "#B46BFF",
    brownGray: "#5d536a",
    black: "#000000",
    white: "#ffffff",
    blue: "#0037c1",
    gray: "#767577",
    star: "#FFD700",
    golden: "#FFD700",
    trueGreen: "#1eaf08",
    halfWhite: "#eeeeee",
    charcoalGrey: "#4a4b4d",
    veryLightpink: "#ffeef2",
    transparent: "transparent",
    pink: "#d323a0",
    red: "#FF0000",
    cyan: '#21D4B4',
    lightGray: '#C0C0C0',
    statusBarColor: 'light-content',
    statusBarStyle: "#000000"
};
export const getTheme = (theme) => {
    return theme === 'Light' ? LightTheme : DarkTheme;
};

const appTheme = { COLORS };

export default appTheme;

/* * Fonts * */
export const FONTFAMILY = {
    Bold: "Montserrat-Bold",
    Light: "Montserrat-Light",
    Medium: "Montserrat-Medium",
    Regular: "Montserrat-Regular",

    Ionicons: "Ionicons",
    AntDesign: "AntDesign",
    EvilIcons: "EvilIcons",
    Entypo: "Entypo",
    FontAwesome: "FontAwesome",
    Feather: "Feather",
    MaterialIcons: "MaterialIcons",
    MaterialCommunityIcons: "MaterialCommunityIcons",
    Octicons: "Octicons",
    SimpleLineIcons: "SimpleLineIcons",
    Fontisto: "Fontisto",
    Poppins: "Poppins"

};

/* * Images * */
export const IMAGES = {
    icon: require("../assets/images/icon.png"),
    logo: require("../assets/images/logo.png"),
    avatar: require("../assets/images/avatar.png"),
    user: require("../assets/images/user.png"),
    ProductImage: require("../assets/images/ProductImage.png"),
    CardBg: require("../assets/images/cardBg.png"),
    lockBg: require("../assets/images/lockBg.png"),
    lock: require("../assets/images/lock.png"),
    DummyProducts: {
        product1: require("../assets/dummyProduct/product1.png"),
        product2: require("../assets/dummyProduct/product2.png"),
        product3: require("../assets/dummyProduct/product3.png"),
        product4: require("../assets/dummyProduct/product4.png"),
        product5: require("../assets/dummyProduct/product5.png"),
        product6: require("../assets/dummyProduct/product6.png"),
        product7: require("../assets/dummyProduct/product6.png"),
        product8: require("../assets/dummyProduct/product8.png"),
        product9: require("../assets/dummyProduct/product9.png"),
        product10: require("../assets/dummyProduct/product10.png"),

    },
    DummyBanner: {
        banner1: require("../assets/dummyBanner/banner1.png"),
        banner2: require("../assets/dummyBanner/banner2.jpg"),
        banner3: require("../assets/dummyBanner/banner3.jpg"),
    },
    DummyCategories: {
        cat1: require("../assets/dummyCategories/cat1.png"),
        cat2: require("../assets/dummyCategories/cat2.png"),
        cat3: require("../assets/dummyCategories/cat3.png"),
        cat4: require("../assets/dummyCategories/cat4.png"),
    }

};

/* * Screens * */
export const SCREENS = {
    Startup: "Startup",
    Login: "login",
    SignUp: "SignUp",
    ConfirmationMail: "ConfirmationMail",
    EmailVerification: "EmailVerification",
    NewPassword: "NewPassword",
    Drawer: "Drawer",
    Home: "Home",
    BottamTab: "BottamTab",
    OrderDetails: "OrderDetails",
    About: "About",
    wishList: "wishList",
    drawwer: "drawwer",
    profile: "profile",
    order: "Order",
    products: "products",
    contactUs: "contactus",
    termAndCondition: "termsAndCondition",
    privacyPolicy: "privacyPolicy",
    singleProduct: "singleProduct",
    MyCart: "MyCart",
    checkOut: "CheckOut",
    PasswordSuccessful: "PasswordSuccessful",
    ProductDetail: "ProductDetail",
    AllProduct: "AllProduct",

};

export const SIZES = {
    // global sizes
    five: height * 0.0055,
    ten: height * 0.011,
    fifteen: height * 0.017,
    twenty: height * 0.023,
    twentyWidth: width * 0.05,
    twentyFive: height * 0.03,
    twentyFiveWidth: width * 0.08,
    fifty: height * 0.075,
    fiftyWidth: width * 0.13,

    // font sizes
    h16: width * 0.034,
    h18: width * 0.038,
    h20: width * 0.042,
    h22: width * 0.048,
    h24: width * 0.055,
    body08: width * 0.024,
    body10: width * 0.028,
    body12: width * 0.032,
    body14: width * 0.036,
    body16: width * 0.04,
    body18: width * 0.045,
};

export const FONTS = {
    boldFont16: {
        fontFamily: FONTFAMILY.Bold,
        fontSize: SIZES.h16,
        color: COLORS.defaultTextColor,
    },
    boldFont18: {
        fontFamily: FONTFAMILY.Bold,
        fontSize: SIZES.h18,
        color: COLORS.defaultTextColor,
    },
    boldFont20: {
        fontFamily: FONTFAMILY.Bold,
        fontSize: SIZES.h20,
        color: COLORS.defaultTextColor,
    },
    boldFont22: {
        fontFamily: FONTFAMILY.Bold,
        fontSize: SIZES.h22,
        color: COLORS.defaultTextColor,
    },
    boldFont24: {
        fontFamily: FONTFAMILY.Bold,
        fontSize: SIZES.h24,
        color: COLORS.defaultTextColor,
    },
    semiBoldFont16: {
        fontFamily: FONTFAMILY.SemiBold,
        fontSize: SIZES.h16,
        color: COLORS.defaultTextColor,
    },
    semiBoldFont18: {
        fontFamily: FONTFAMILY.SemiBold,
        fontSize: SIZES.h18,
        color: COLORS.defaultTextColor,
    },
    semiBoldFont20: {
        fontFamily: FONTFAMILY.SemiBold,
        fontSize: SIZES.h20,
        color: COLORS.defaultTextColor,
    },
    semiBoldFont22: {
        fontFamily: FONTFAMILY.SemiBold,
        fontSize: SIZES.h22,
        color: COLORS.defaultTextColor,
    },
    semiBoldFont24: {
        fontFamily: FONTFAMILY.SemiBold,
        fontSize: SIZES.h24,
        color: COLORS.defaultTextColor,
    },
    mediumFont10: { fontFamily: FONTFAMILY.Medium, fontSize: SIZES.body10 },
    mediumFont12: { fontFamily: FONTFAMILY.Medium, fontSize: SIZES.body12 },
    mediumFont14: { fontFamily: FONTFAMILY.Medium, fontSize: SIZES.body14 },
    mediumFont16: { fontFamily: FONTFAMILY.Medium, fontSize: SIZES.body16 },
    mediumFont18: { fontFamily: FONTFAMILY.Medium, fontSize: SIZES.body18 },
    regularFont10: { fontFamily: FONTFAMILY.Regular, fontSize: SIZES.body10 },
    regularFont12: { fontFamily: FONTFAMILY.Regular, fontSize: SIZES.body12 },
    regularFont14: { fontFamily: FONTFAMILY.Regular, fontSize: SIZES.body14 },
    regularFont16: { fontFamily: FONTFAMILY.Regular, fontSize: SIZES.body16 },
    regularFont18: { fontFamily: FONTFAMILY.Regular, fontSize: SIZES.body18 },
    lightFont08: { fontFamily: FONTFAMILY.Light, fontSize: SIZES.body08 },
    lightFont10: { fontFamily: FONTFAMILY.Light, fontSize: SIZES.body10 },
    lightFont12: { fontFamily: FONTFAMILY.Light, fontSize: SIZES.body12 },
    lightFont14: { fontFamily: FONTFAMILY.Light, fontSize: SIZES.body14 },
    lightFont16: { fontFamily: FONTFAMILY.Light, fontSize: SIZES.body16 },
    lightFont18: { fontFamily: FONTFAMILY.Light, fontSize: SIZES.body18 },
};

export const STYLES = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: SIZES.twenty,
        paddingTop: SIZES.twenty * 1.5,
        // backgroundColor: COLORS.white
        // marginTop: 20

    },
    shadow: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.32,
        shadowRadius: 5.46,

        elevation: 9,
    }

});

export const CONSTANTS = {

    SHHIPPING_ZONE_ID: 3,
    login_id: "9C42HVfgYJk",
    transactionKey: "5Hh59u46KF8cztCD",
    stripe_Payment_url: "https://demo25.mystagingserver.site/angel/wp-json/stripe-payment/v1/create-payment-intent",
    stripe_Key: "pk_test_51PfgiXKok2Hx7w4Uhe7ilNHF7FKjxIL8qmgwsqWZhu9KBpMAY8IjLTdoSgm5oX5JuzBmsg2LppFcdLDhtJwxvDRi00VqUJ0E7k",

    API_URLS: {
        Consumer_key: "ck_ba3d79fe0eec184c5c7b68ef7df17b5c91a9f2f0",
        Consumer_secret: "cs_1cba8166135840fde87dc1dfaf0eaf4d33c0de3b",
        BASE: "https://demo25.mystagingserver.site/angel/wp-json",
        LOGIN: "/api/login",
        REGISTER: "/api/register",
        FORGOT_PASSWORD: "/api/forgot_password",
        VERIFY_OTP: "/api/otp_verification",
        RESET_PASSWORD: "/api/reset_password",
        PROFILE: "",
        CONTACT_US: "/api/contact_us",
        UPDATE_PROFILE: "/api/update_profile",
        CHANGE_PASSWORD: "/api/change_password",
        DELETE_ACCOUNT: "/api/delete_account",
        CREATE_ORDER: "/wc/v3/orders",
        RETRIEVE_ORDER: " /wc/v3/orders/",
        ALL_ORDER: "/wc/v3/orders",
        UPDATE_ORDER: "/wc/v3/orders/",
        DELETE_ORDER: "/wc/v3/orders/",
        CREATE_PRODUCT: "/wc/v3/products",
        RETRIEVE_PRODUCT: "/wc/v3/products/",
        ALL_PRODUCT: "/wc/v3/products",
        GET_VARIATION: "/wc/v3/products/",
        GET_BANNER: "/api/get_banners",
        GET_COUNTRIES: "/wc/v3/data/countries",
        GET_SHIPPING_METHODS: "/wc/v3/shipping/zones/",
        ALL_REVIEWS: "/wc/v3/products/reviews/",
        GET_CONTENT: "/api/get_web_content",
        ALL_Categories: "/wc/v3/products/categories",
        UPDATE_PRODUCT: "/wc/v3/products/",
        DELETE_PRODUCT: "/wc/v3/products/",
        APPLY_VOUCHER: "/wc/v3/coupons",
        SETTINGS: '/wc/v3/settings/',
        PAYMENT: '/wc/v3/payment_gateways/',
        PAYPAL: '/api/get_paypal_key',
        ADD_TO_FAV: '/api/add_wishlist',
        GET_FAV: '/api/get_wishlist'

    },


};