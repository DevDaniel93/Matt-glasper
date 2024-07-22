
import { useTranslation } from "react-i18next";
import { IconType } from "../components";
import DrawerScreen from "../screens/DrawerScreen";
import ContactUs from "../screens/contactUs/ContactUs";
import AboutUs from "../screens/content/AboutUs";
import PrivacyPolicy from "../screens/content/PrivacyPolicy";
import termAndCondition from "../screens/content/TermsAndConditon";
import Home from "../screens/home/Home";
import MyOrder from "../screens/order/MyOrder";
import Profile from "../screens/profile/Profile";
import WishList from "../screens/wishList/WishList";
import { COLORS, SCREENS } from "./theme";
import AllProducts from "../screens/product/AllProducts";

export const Menu = [
    { route: SCREENS.Home, labelKey: 'Home', type: IconType.FontAwesome, icon: 'home', component: Home, notification: 0 },
    { route: SCREENS.About, labelKey: 'About us', type: IconType.AntDesign, icon: 'questioncircle', component: AboutUs, notification: 0 },
    { route: SCREENS.wishList, labelKey: 'WishList', type: IconType.FontAwesome, icon: 'heart', component: WishList, notification: 0 },
    { route: SCREENS.profile, labelKey: 'My Profile', type: IconType.FontAwesome5, icon: 'user-alt', component: Profile, notification: 0 },
    { route: SCREENS.order, labelKey: 'My Order', type: IconType.Feather, icon: 'pie-chart', component: MyOrder, notification: 0 },
    // { route: SCREENS.AllProduct, labelKey: 'Products', type: IconType.MaterialIcons, icon: 'view-list', component: AllProducts, notification: 0 },
    { route: SCREENS.contactUs, labelKey: 'Contact Us', type: IconType.MaterialIcons, icon: 'contact-page', component: ContactUs, notification: 0 },
    { route: SCREENS.termAndCondition, labelKey: 'Terms and Conditon', type: IconType.Foundation, icon: 'clipboard-notes', component: termAndCondition, notification: 0 },
    { route: SCREENS.privacyPolicy, labelKey: 'Privacy Policy', type: IconType.MaterialCommunityIcons, icon: 'credit-card-scan', component: PrivacyPolicy, notification: 0 },
    { route: "language", labelKey: 'Select Language', type: IconType.FontAwesome, icon: 'language', component: PrivacyPolicy, notification: 0 },
    { route: "Delete_Account", labelKey: 'Delete Account', type: IconType.Entypo, icon: 'remove-user', component: DrawerScreen, notification: 0 },
    { route: 'logout', labelKey: 'logout', type: IconType.Ionicons, icon: 'log-out-sharp', component: DrawerScreen, notification: 0 },
];