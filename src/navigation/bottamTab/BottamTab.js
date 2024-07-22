import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React, { useEffect, useRef } from 'react'
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'


import * as Animatable from 'react-native-animatable';
import { Icon, IconType } from '../../components';
import { COLORS, SCREENS, SIZES } from '../../constants';
import Home from '../../screens/home/Home';
import WishList from '../../screens/wishList/WishList';
import MyOrder from '../../screens/order/MyOrder';
import MyCart from '../../screens/cart/MyCart';
import DrawerSceneWrapper from '../../components/DrawerSceneWrapper';
import { useSelector } from 'react-redux';
import { getTheme } from '../../constants/theme';
import { useTranslation } from 'react-i18next';


const Demo = () => {
    return (
        <View style={{ flex: 1, backgroundColor: COLORS.white }}>

        </View>
    )
}

const TabArr = [
    { route: SCREENS.Home, label: 'Home', type: IconType.Feather, icon: 'home', component: Home, },
    { route: SCREENS.MyCart, label: "Cart", type: IconType.SimpleLineIcons, icon: 'handbag', component: MyCart, },
    { route: SCREENS.wishList, label: 'Wishlist', type: IconType.AntDesign, icon: 'hearto', component: WishList, },
    { route: SCREENS.order, label: 'Orders', type: IconType.SimpleLineIcons, icon: 'list', component: MyOrder, },
    { route: 'Account', label: 'Account', type: IconType.FontAwesome, icon: 'user-o', component: Demo, },
];

const Tab = createBottomTabNavigator();

const TabButton = (props) => {
    const { t } = useTranslation();
    const theme = useSelector(state => state.Theme.theme)
    const currentTheme = getTheme(theme)
    const { item, onPress, accessibilityState } = props;
    const focused = accessibilityState.selected;
    const viewRef = useRef(null);
    const textViewRef = useRef(null);
    const cart = useSelector(state => state.Cart.cart)


    useEffect(() => {
        if (focused) { // 0.3: { scale: .7 }, 0.5: { scale: .3 }, 0.8: { scale: .7 },
            viewRef.current.animate({ 0: { scale: 0 }, 1: { scale: 1 } });
            textViewRef.current.animate({ 0: { scale: 0 }, 1: { scale: 1 } });
        } else {
            viewRef.current.animate({ 0: { scale: 1, }, 1: { scale: 0, } });
            textViewRef.current.animate({ 0: { scale: 1 }, 1: { scale: 0 } });
        }
    }, [focused])

    return (
        <TouchableOpacity
            onPress={onPress}
            activeOpacity={1}
            style={[styles.container, { flex: focused ? 1 : 0.65, }]}>
            <View>
                {cart.length > 0 && item.label === "Cart" && !focused && <View style={styles.dot} />}
                <Animatable.View
                    ref={viewRef}
                    style={[StyleSheet.absoluteFillObject, { backgroundColor: currentTheme.secondary, borderRadius: SIZES.twentyFive, }]} />
                <View style={[styles.btn]}>

                    <Icon type={item.type} name={item.icon} color={focused ? COLORS.white : currentTheme.defaultTextColor} size={SIZES.twenty} />
                    <Animatable.View
                        ref={textViewRef}>
                        {focused && <Text style={{
                            color: COLORS.white, paddingHorizontal: SIZES.ten
                        }}>{item.label}</Text>}
                    </Animatable.View>
                </View>
            </View>
        </TouchableOpacity>
    )
}

export default function BottamTab() {
    const { t } = useTranslation();

    const theme = useSelector(state => state.Theme.theme)
    const currentTheme = getTheme(theme)
    const getTranslatedMenu = () => {
        return TabArr.map((item) => ({
            ...item,
            label: t(item.label)
        }));
    };
    const translatedMenu = getTranslatedMenu();
    return (
        <DrawerSceneWrapper>


            <SafeAreaView style={{ flex: 1 }}>
                <Tab.Navigator
                    screenOptions={{
                        headerShown: false,
                        tabBarStyle: {
                            borderTopWidth: 3,
                            borderLeftWidth: 1,
                            borderRightWidth: 1,
                            borderColor: currentTheme.secondary,
                            position: 'absolute',
                            backgroundColor: currentTheme.Background,
                            // margin: SIZES.twenty,
                            marginBottom: SIZES.twenty,
                            marginHorizontal: SIZES.twenty,
                            marginTop: SIZES.five,
                            borderRadius: SIZES.fifty,
                            height: SIZES.fifty + SIZES.ten,
                            paddingHorizontal: SIZES.five,

                        }
                    }}
                >

                    {translatedMenu.map((item, index) => {
                        return (
                            <Tab.Screen key={index} name={item.route} component={item.component}
                                options={{
                                    tabBarShowLabel: false,
                                    tabBarButton: (props) =>
                                        <TabButton {...props} item={item} />
                                }}
                                listeners={({ navigation }) => ({
                                    tabPress: e => {
                                        e.preventDefault();
                                        if (item.route === "Account") {
                                            navigation.openDrawer();
                                        } else {
                                            navigation.navigate(item.route);
                                        }
                                    }
                                })}
                            />
                        )
                    })}
                </Tab.Navigator>
            </SafeAreaView>
        </DrawerSceneWrapper>
    )
}

const styles = StyleSheet.create({
    container: {

        justifyContent: 'center',
        alignItems: 'center',

    },
    btn: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 8,
        borderRadius: 16,
    },
    dot: {
        width: SIZES.ten,
        height: SIZES.ten,
        backgroundColor: COLORS.red,
        borderRadius: 50,
        position: "absolute",
        zIndex: 1000,
        right: 0,
        top: 5
    }
})
