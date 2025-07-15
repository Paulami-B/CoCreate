import { persistReducer, persistStore } from "redux-persist";
import authReducer from "./redux/authSlice";
import { configureStore } from "@reduxjs/toolkit";
import AsyncStorage from '@react-native-community/async-storage';

const rootReducer = authReducer;

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    version: 1
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store: any = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware({ serializableCheck: false })
})

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;