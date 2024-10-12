import React, { createContext, useContext, useState, useEffect } from "react";
import Cookies from 'js-cookie';

interface AuthContextType {
    isAuthenticated: boolean;
    isLoading: boolean;
    login: (token: string) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Check for token in cookies
        const token = Cookies.get("token");
        // Set authentication state based on token presence
        setIsAuthenticated(!!token);
        setIsLoading(false);
    }, []);

    const oneHourFromNow = new Date(Date.now() + 60 * 60 * 1000);

    const login = (token: string) => {
        Cookies.set('token', token, { expires: oneHourFromNow, secure: true, sameSite: 'Strict' });
        setIsAuthenticated(true);
    };

    const logout = () => {
        Cookies.remove("token");
        setIsAuthenticated(false);
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <AuthContext.Provider value={{ isAuthenticated, isLoading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
