// import 'react-native-gesture-handler';
// import React, { useEffect, useState } from 'react';
// import './src/translation/i18n';
// import {
//   LogBox,
//   StyleSheet,
//   Text,
//   View,
//   Platform,
//   StatusBar,
//   SafeAreaView,
// } from 'react-native';
// import { Provider, useSelector } from 'react-redux';
// import NetInfo from '@react-native-community/netinfo';
// import MainNavigation from './src/navigation/MainNavigation';
// import { AnimatedSplash, Icon, IconType } from './src/components';
// import { COLORS, FONTS, IMAGES, SIZES } from './src/constants';
// import { store } from './src/redux/store';


// const App = () => {
//   const [networkState, setNetworkState] = useState(true);
//   const [isLoaded, setIsLoaded] = useState(false);

//   useEffect(() => {
//     LogBox.ignoreAllLogs();
//     setTimeout(() => {
//       setIsLoaded(true);
//     }, 1500);
//   }, []);

//   useEffect(() => {
//     const unsubscribe = NetInfo.addEventListener(async state => {
//       // console.log('Connection status: ', state);

//       setTimeout(() => {
//         setNetworkState(state.isInternetReachable);
//       }, 1000);
//     });

//     return () => unsubscribe();
//   });

//   return (
//     <SafeAreaView style={styles.safeAreaView}>

//       <StatusBar
//         backgroundColor={COLORS.transparent}
//         // translucent={Platform.OS === 'android'}
//         barStyle={"dark-content"}
//       />
//       <AnimatedSplash
//         translucent={true}
//         isLoaded={isLoaded}
//         logoImage={IMAGES.logo}
//         backgroundColor={COLORS.primary}
//         logoHeight={SIZES.fifty * 4}
//         logoWidth={SIZES.fifty * 4}>


//         {networkState ? (
//           <Provider store={store}>
//             <MainNavigation />
//           </Provider>
//         ) : (

//           <View style={styles.noInternetView}>
//             <View style={styles.imgStyle}>
//               <Icon
//                 name={'wifi-off'}
//                 type={IconType.Feather}
//                 size={SIZES.fifty * 1.75}
//                 color={COLORS.primary}
//               />
//             </View>
//             <Text style={[FONTS.boldFont22, styles.headingStyle]}>
//               No Internet
//             </Text>
//             <Text style={[FONTS.boldFont22, styles.headingStyle]}>
//               Connection Available
//             </Text>
//             <View style={{ marginTop: SIZES.twenty }}>
//               <Text style={[FONTS.mediumFont14, styles.textStyle]}>
//                 Your device is not connected to internet
//               </Text>
//               <Text style={[FONTS.mediumFont14, styles.textStyle]}>
//                 Please make sure your connection is working
//               </Text>
//             </View>
//           </View>
//         )}
//       </AnimatedSplash>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   safeAreaView: {
//     flex: 1,

//   },
//   noInternetView: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//     paddingHorizontal: SIZES.twentyFive,
//   },
//   imgStyle: {
//     marginBottom: SIZES.twentyFive,
//   },
//   textStyle: {
//     textAlign: 'center',
//     color: COLORS.textGrey,
//   },
//   headingStyle: {
//     color: COLORS.primary,
//   },
// });

// export default App;

import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import './src/translation/i18n';
import {
  LogBox,
  StyleSheet,
  Text,
  View,
  StatusBar,
  SafeAreaView,
  ActivityIndicator,
  Image
} from 'react-native';
import { Provider } from 'react-redux';
import NetInfo from '@react-native-community/netinfo';
import MainNavigation from './src/navigation/MainNavigation';
import { AnimatedSplash, Icon, IconType } from './src/components';
import { COLORS, FONTS, IMAGES, SIZES, height, width } from './src/constants';
import { store } from './src/redux/store';
import i18n from './src/translation/i18n';
import Toast from 'react-native-toast-message';

import { GestureHandlerRootView } from 'react-native-gesture-handler';
const App = () => {
  const [networkState, setNetworkState] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isI18nInitialized, setIsI18nInitialized] = useState(false);


  useEffect(() => {
    LogBox.ignoreAllLogs();
    setTimeout(() => {
      setIsLoaded(true);
    }, 1500);
  }, []);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(async state => {
      setTimeout(() => {
        setNetworkState(state.isInternetReachable);
      }, 1000);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const handleI18nInitialized = () => {
      setIsI18nInitialized(true);
    };

    if (i18n.isInitialized) {
      handleI18nInitialized();
    } else {
      i18n.on('initialized', handleI18nInitialized);
    }

    return () => {
      i18n.off('initialized', handleI18nInitialized);
    };
  }, []);

  if (!isLoaded || !isI18nInitialized) {
    return (
      <SafeAreaView style={styles.safeAreaView}>
        <StatusBar
        
          backgroundColor={COLORS.backgroundGray}
          barStyle={"dark-content"}
        />
        <AnimatedSplash
          translucent={true}
          isLoaded={isLoaded && isI18nInitialized}
          logoImage={IMAGES.logo}
          backgroundColor={COLORS.black}
          logoHeight={SIZES.fifty * 3}
          logoWidth={SIZES.fifty * 3}
        />
        {/* <View style={styles.loadingContainer}>

          <Image
            source={IMAGES.icon}
            style={styles.img}
          />
          <ActivityIndicator size="large" color={COLORS.primary} />
        </View> */}
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <StatusBar
        backgroundColor={COLORS.transparent}
        barStyle={"dark-content"}
      />
      {networkState ? (
        <GestureHandlerRootView>
          <Provider store={store}>
            <MainNavigation />
            <Toast
            />
          </Provider>
        </GestureHandlerRootView>

      ) : (
        <View style={styles.noInternetView}>
          <View style={styles.imgStyle}>
            <Icon
              name={'wifi-off'}
              type={IconType.Feather}
              size={SIZES.fifty * 1.75}
              color={COLORS.primary}
            />
          </View>
          <Text style={[FONTS.boldFont22, styles.headingStyle]}>
            No Internet
          </Text>
          <Text style={[FONTS.boldFont22, styles.headingStyle]}>
            Connection Available
          </Text>
          <View style={{ marginTop: SIZES.twenty }}>
            <Text style={[FONTS.mediumFont14, styles.textStyle]}>
              Your device is not connected to internet
            </Text>
            <Text style={[FONTS.mediumFont14, styles.textStyle]}>
              Please make sure your connection is working
            </Text>
          </View>
        </View>
      )}

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    backgroundColor: COLORS.Background
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  img: {
    width: width * .3,
    height: width * .3,
    resizeMode: "contain",
    marginBottom: SIZES.twentyFive
  },
  noInternetView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: SIZES.twentyFive,
  },
  imgStyle: {
    marginBottom: SIZES.twentyFive,
  },
  textStyle: {
    textAlign: 'center',
    color: COLORS.textGrey,
  },
  headingStyle: {
    color: COLORS.primary,
  },
});

export default App;
