import { Navigate } from "react-router";
import { useAuth } from "./authContext";


export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    const { isAuthenticated } = useAuth();
    if (!isAuthenticated) {
        return <Navigate to="/signin" replace/>
    }
    return children;
};