

declare global {
    interface Window {
        ethereum?: {
            selectedAddress?: string; // Change this to `string` if you want to get the address directly
            isMetaMask?: boolean;
            request: (args: { method: string; params?: any[] | Record<string, any> }) => Promise<any>;
        };
        isMetaMask?: boolean;
    }
}

export {};
