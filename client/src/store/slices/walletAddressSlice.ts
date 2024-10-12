// walletSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface WalletState {
    walletAddress: string | null;
    error: string | null;
}

const initialState: WalletState = {
    walletAddress: null,
    error: null,
};

const walletSlice = createSlice({
    name: "wallet",
    initialState,
    reducers: {
        connectWallet: (state, action: PayloadAction<string>) => {
            state.walletAddress = action.payload;
            state.error = null;
        },
        disconnectWallet: (state) => {
            state.walletAddress = null;
            state.error = null;
        },
        setWalletError: (state, action: PayloadAction<string>) => {
            state.error = action.payload;
        },
    },
});

export const { connectWallet, disconnectWallet, setWalletError } = walletSlice.actions;

export default walletSlice.reducer;

// Selectors
export const selectWalletAddress = (state: { wallet: WalletState }) => state.wallet.walletAddress;
export const selectWalletError = (state: { wallet: WalletState }) => state.wallet.error;
