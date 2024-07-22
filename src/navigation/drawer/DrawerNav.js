import React, { useEffect } from 'react';
import { createDrawerNavigator, DrawerActions } from '@react-navigation/drawer';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { View, Text, Platform, StyleSheet } from 'react-native';
import { Easing } from 'react-native-reanimated';

import CustomDrawer from './CustomDrawer';
import BottamTab from '../bottamTab/BottamTab';
import { SCREENS } from '../../constants';
import { Menu } from '../../constants/DrawerMenu';
import { getTheme } from '../../constants/theme';

const config = {
    animation: 'timing',
    config: {
        duration: 500,
        easing: Easing.linear,
    },
};

const closeConfig = {
    animation: 'timing',
    config: {
        duration: 500,
        easing: Easing.linear,
    },
};

const fadeInAnimation = ({ current }) => ({
    cardStyle: {
        opacity: current.progress,
    },
});

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
    const theme = useSelector(state => state.Theme.theme);
    const currentTheme = getTheme(theme);

    return (
        <Drawer.Navigator
            initialRouteName={SCREENS.BottamTab}
            screenOptions={{
                sceneContainerStyle: {
                    backgroundColor: currentTheme.Background,
                    flex: 1,
                },
                transitionSpec: {
                    open: config,
                    close: closeConfig,
                },
                cardStyleInterpolator: fadeInAnimation,
            }}
            drawerContent={(props) => <CustomDrawer {...props} />}

        >
            <Drawer.Screen name={SCREENS.BottamTab} component={BottamTab} options={{ headerShown: false, headerTitle: '' }} />
            {Menu.map((item, index) => (
                <Drawer.Screen key={index} name={item.route} component={item.component} options={{ headerShown: false, headerTitle: '' }} />
            ))}
        </Drawer.Navigator>
    );
}
