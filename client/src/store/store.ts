import { configureStore } from "@reduxjs/toolkit";
import titleReducer from "./slices/titleSlice";
import addressReducer from "./slices/walletAddressSlice"

export const store = configureStore({
    reducer: {
        titles:titleReducer,
        walletAddress:addressReducer
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;