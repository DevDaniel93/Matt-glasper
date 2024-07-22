import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import UserTypeReducer from './slices/userType';
import CartReducer from './slices/Cart';
import ThemeReducer from './slices/theme';
import utilsReducer from './slices/utils';
import AuthReducer from './slices/auth';
import ProductReducer from './slices/products';
import CategoryReducer from './slices/categories';
import OrderReducer from './slices/orders';
import ReviewReducer from './slices/Reviews';
import VoucherReducer from './slices/vouchers';
import ContentReducer from './slices/content';
import ShippingReducer from './slices/shipping';
import BannerReducer from './slices/banner';
import ContactReducer from './slices/contactUs';
import SettingsReducer from './slices/settings';
import PaymentReducer from './slices/paymentGateway';


const persistConfig = {
    key: 'root',
    storage: AsyncStorage,

};

const rootReducer = combineReducers({
    Theme: ThemeReducer,
    utils: utilsReducer,
    Cart: CartReducer,
    Auth: AuthReducer,
    UserType: UserTypeReducer,
    Product: ProductReducer,
    categories: CategoryReducer,
    Orders: OrderReducer,
    Review: ReviewReducer,
    Voucher: VoucherReducer,
    Content: ContentReducer,
    Shipping: ShippingReducer,
    Banner: BannerReducer,
    Contact: ContactReducer,
    Settings: SettingsReducer,
    Payment: PaymentReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    devTools: true,
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware({
            immutableCheck: false, // Disable ImmutableStateInvariantMiddleware
            serializableCheck: false, // Optionally disable other middleware checks
        });
    },

});

export const persistor = persistStore(store);