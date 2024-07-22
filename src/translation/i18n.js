// import i18n from 'i18next';
// import { initReactI18next } from 'react-i18next';
// import { en, fr } from '../localization';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// const STORE_LANGUAGE_KEY = 'settings.lang';

// const languageDetectorPlugin = {
//   type: 'languageDetector',
//   async: true,
//   init: () => { },
//   detect: async function (callback) {
//     try {
//       // get stored language from Async storage
//       // put your own language detection logic here
//       await AsyncStorage.getItem(STORE_LANGUAGE_KEY).then(language => {
//         if (language) {
//           // if language was stored before, use this language in the app
//           return callback(language);
//         } else {
//           // if language was not stored yet, use english
//           return callback('en');
//         }
//       });
//     } catch (error) {
//       console.log('Error reading language', error);
//     }
//   },
//   cacheUserLanguage: async function (language) {
//     try {
//       // save a user's language choice in Async storage
//       await AsyncStorage.setItem(STORE_LANGUAGE_KEY, language);
//     } catch (error) { }
//   },
// };

// const resources = {
//   en: {
//     translation: en,
//   },
//   fr: {
//     translation: fr,
//   },
// };

// i18n
//   .use(initReactI18next)
//   .use(languageDetectorPlugin)
//   .init({
//     resources,
//     compatibilityJSON: 'v3',
//     // fallback language is set to english
//     fallbackLng: 'en',
//     interpolation: {
//       escapeValue: false,
//     },
//   });

// export default i18n;
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { en, fr } from '../localization';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORE_LANGUAGE_KEY = 'settings.lang';

const languageDetectorPlugin = {
  type: 'languageDetector',
  async: true,
  init: () => { },
  detect: async function (callback) {
    try {
      await AsyncStorage.getItem(STORE_LANGUAGE_KEY).then(language => {
        if (language) {
          return callback(language);
        } else {
          return callback('en');
        }
      });
    } catch (error) {
      console.log('Error reading language', error);
    }
  },
  cacheUserLanguage: async function (language) {
    try {
      await AsyncStorage.setItem(STORE_LANGUAGE_KEY, language);
    } catch (error) { }
  },
};

const resources = {
  en: {
    translation: en,
  },
  fr: {
    translation: fr,
  },
};

i18n
  .use(initReactI18next)
  .use(languageDetectorPlugin)
  .init({
    resources,
    compatibilityJSON: 'v3',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

i18n.on('initialized', () => {
  console.log('i18n initialized');
});

export default i18n;
