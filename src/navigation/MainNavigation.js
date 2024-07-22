import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { COLORS, SCREENS } from "../constants";
import { StatusBar, Text, View } from "react-native";
import BottamTab from "./bottamTab/BottamTab";
import DrawerNav from "./drawer/DrawerNav";
import Login from "../screens/auth/Login";
import Signup from "../screens/auth/SignUp";
import ConfirmationMail from "../screens/auth/ConfirmationMail";
import EmailVerification from "../screens/auth/EmailVerification";
import NewPassword from "../screens/auth/NewPassword";
import OrderDetails from "../screens/order/OrderDetails";
import ContactUs from "../screens/contactUs/ContactUs";
import SingleProduct from "../screens/product/SingleProduct";
import CheckOut from "../screens/checkOut/CheckOut";
import TermAndCondition from "../screens/content/TermsAndConditon";
import PrivacyPolicy from "../screens/content/PrivacyPolicy";
import AboutUs from "../screens/content/AboutUs";
import Profile from "../screens/profile/Profile";
import PasswordSuccessful from "../screens/auth/PasswordSuccessful";
import { useDispatch, useSelector } from "react-redux";
import { getTheme } from "../constants/theme";
import ProductDetail from "../screens/product/ProductDetail";
import Loading from "../components/Loading";
import { setLoading } from "../redux/slices/utils";
import AllProducts from "../screens/product/AllProducts";
import { getAbout, getPrivacyPolicy, getTermsAndCondition } from "../redux/slices/content";
import { getCountries, getShippingMethods } from "../redux/slices/shipping";
import { getSettings } from "../redux/slices/settings";
import { getPayment } from "../redux/slices/paymentGateway";
import { getCategories } from "../redux/slices/categories";


const Stack = createNativeStackNavigator();


export default function MainNavigation() {
    const theme = useSelector(state => state.Theme.theme)
    const user = useSelector(state => state.Auth.user);
    const loading = useSelector(state => state.utils.loading)
    const currentTheme = getTheme(theme)
    const dispatch = useDispatch()
    const screenOptions = {
        headerShown: false,
        animation: "slide_from_right",
        headerStyle: {
            color: COLORS.white
            // backgroundColor: '#121212',
        },
    };

    const getContent = async () => {
        try {
            dispatch(setLoading(true))
            await dispatch(getTermsAndCondition())
            await dispatch(getPrivacyPolicy())
            await dispatch(getCategories())
            await dispatch(getAbout())
            await dispatch(getCountries())
            await dispatch(getShippingMethods())
            await dispatch(getSettings())
            await dispatch(getPayment())
            dispatch(setLoading(false))

        } catch (error) {
            dispatch(setLoading(false))
            console.log({ error })

        }
    }
    dispatch(setLoading(false))

    useEffect(() => {
        getContent()

    }, []);

    useEffect(() => {

        StatusBar.setBarStyle(currentTheme.statusBarColor, true);
        StatusBar.setBackgroundColor(currentTheme.statusBarStyle, true);
    }, [theme]);

    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={screenOptions}
                initialRouteName={SCREENS.Drawer}
            >
                <Stack.Screen name={SCREENS.Login} component={Login} />
                <Stack.Screen name={SCREENS.SignUp} component={Signup} />
                <Stack.Screen name={SCREENS.ConfirmationMail} component={ConfirmationMail}
                    options={({ route }) => ({
                        headerShown: true,
                        headerTintColor: currentTheme.secondary,
                        headerTitleStyle: { color: currentTheme.secondary },
                        headerStyle: { backgroundColor: currentTheme.Background },
                        headerShadowVisible: false,
                        headerTitle: route.params.title,
                    })}
                />
                <Stack.Screen name={SCREENS.EmailVerification} component={EmailVerification}
                    options={({ route }) => ({
                        headerShown: true,
                        headerTintColor: currentTheme.secondary,
                        headerTitleStyle: { color: currentTheme.secondary },
                        headerStyle: { backgroundColor: currentTheme.Background },
                        headerShadowVisible: false,
                        headerTitle: route.params.title
                    })} />

                <Stack.Screen name={SCREENS.NewPassword} component={NewPassword}
                    options={({ route }) => ({
                        headerShown: true,
                        headerTintColor: currentTheme.secondary,
                        headerTitleStyle: { color: currentTheme.secondary },
                        headerStyle: { backgroundColor: currentTheme.Background },
                        headerShadowVisible: false,
                        headerTitle: route.params.title,
                    })}
                />
                <Stack.Screen name={SCREENS.PasswordSuccessful} component={PasswordSuccessful} />
                <Stack.Screen name={SCREENS.OrderDetails} component={OrderDetails} />
                <Stack.Screen name={SCREENS.contactUs} component={ContactUs} />
                <Stack.Screen name={SCREENS.termAndCondition} component={TermAndCondition} />
                <Stack.Screen name={SCREENS.privacyPolicy} component={PrivacyPolicy} />
                <Stack.Screen name={SCREENS.singleProduct} component={SingleProduct} />
                <Stack.Screen name={SCREENS.Drawer} component={DrawerNav} />


                <Stack.Screen name={SCREENS.ProductDetail} component={ProductDetail} />
                <Stack.Screen name={SCREENS.checkOut} component={CheckOut} />
                <Stack.Screen name={SCREENS.About} component={AboutUs} />
                <Stack.Screen name={SCREENS.profile} component={Profile} />

                <Stack.Screen name={SCREENS.AllProduct} component={AllProducts} />
            </Stack.Navigator>
            <Loading loading={loading} />

        </NavigationContainer>
    );
}
