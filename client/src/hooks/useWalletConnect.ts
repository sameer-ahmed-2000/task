import { useEffect, useState } from "react";
import { ethers } from "ethers";

export function useWalletConnect() {
    const [walletAddress, setWalletAddress] = useState<string | null>(null);
    const connectWallet = async () => {
        if (typeof window !== 'undefined' && window.ethereum) {
            try {
                await window.ethereum.request({ method: "eth_requestAccounts" })
                const provider = new ethers.BrowserProvider(window.ethereum);
                const signer = await provider.getSigner();
                const address = await signer.getAddress();
                setWalletAddress(address);
                console.log('Connected Wallet Address:', address);
            } catch (err) {
                console.error('Error connecting to MetaMask:', err);
            }
        } else {
            console.log('MetaMask is not installed!');
            alert("Please install Meta mask")
        }
    };

    const disconnectWallet = () => {
        setWalletAddress(null);
        console.log('Wallet disconnected');
    };

    
    useEffect(() => {
    }, []);

    return { walletAddress, connectWallet, disconnectWallet };
};
// const disconnectWallet = async () => {
    //     if (typeof window !== 'undefined' && window.ethereum) {
    //         try {
    //             await window.ethereum.request({
    //                 method: "wallet_switchEthereumChain", params: [{
    //                     chainId:
    //                         '0x1'
    //                 }]
    //             }); // Switch to mainnet if needed
    //             await window.ethereum.request({ method: "eth_requestAccounts", params: [] }); // Request accounts again to trigger logout
    //             setWalletAddress(null);
    //             console.log('Wallet disconnected');
    //         } catch (err) {
    //             console.error('Error disconnecting wallet:', err);
    //         }
    //     } else {
    //         console.log('MetaMask is not installed!');
    //         alert("Please install Meta mask");
    //     }
    // };

