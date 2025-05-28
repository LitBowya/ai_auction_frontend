// store.js
import {configureStore} from '@reduxjs/toolkit';
import {combineReducers} from 'redux';
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import authReducer from './slices/authSlice';
import orderReducer from './slices/orderSlice'
import shippingReducer from './slices/shippingSlice.js'
import {apiService} from './services/apiService';

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['auth', 'order', 'shipping'],
};

const rootReducer = combineReducers({
    auth: authReducer,
    order: orderReducer,
    shipping: shippingReducer,
    [apiService.reducerPath]: apiService.reducer, // RTK Query slice
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }).concat(apiService.middleware),
});

export const persistor = persistStore(store);
