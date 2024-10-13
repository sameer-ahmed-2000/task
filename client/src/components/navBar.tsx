import { useDispatch, useSelector } from "react-redux";
import { connectWallet, disconnectWallet, setWalletError } from "../store/slices/walletAddressSlice";
import { ethers } from "ethers";
import { RootState } from "../store/store"
import { useAuth } from "../auth/authContext";

export const NavBar = () => {
    const dispatch = useDispatch();
    const state=useSelector((state:RootState)=>state)
    const walletAddress = state.walletAddress.walletAddress
    const {logout}=useAuth()
    const handleConnect = async () => {
        if (typeof window !== "undefined" && window.ethereum) {
            try {
                await window.ethereum.request({ method: "eth_requestAccounts" });
                const provider = new ethers.BrowserProvider(window.ethereum);
                const signer = await provider.getSigner();
                const address = await signer.getAddress();
                dispatch(connectWallet(address)); // Dispatch action to connect wallet
                console.log("Connected Wallet Address:", address);
            } catch (err) {
                console.error("Error connecting to MetaMask:", err);
                dispatch(setWalletError("Failed to connect wallet")); // Dispatch error if needed
            }
        } else {
            console.log("MetaMask is not installed!");
            alert("Please install MetaMask");
            dispatch(setWalletError("MetaMask is not installed")); // Dispatch error if needed
        }
    };

    const handleDisconnect = () => {
        dispatch(disconnectWallet());
        console.log('Wallet disconnected');
    };

    return (
        <nav className="px-4 bg-[#3074f4] h-12 flex justify-end items-center">
            {walletAddress ? (
                <p>
                    {walletAddress} <button className="bg-[#FFFFFF] rounded-md h-8 w-24 mx-1 font-bold" onClick={handleDisconnect}>Disconnect</button>
                </p>
            ) : (
                <button className="bg-[#FFFFFF] rounded-md h-8 w-24 font-bold mx-1" onClick={handleConnect}>Connect</button>
            )}
            <button className="bg-[#FFFFFF] rounded-md h-8 w-24 font-bold mx-1" onClick={logout}>Log out</button>
        </nav>
    )
}