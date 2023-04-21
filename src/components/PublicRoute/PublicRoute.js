import { Navigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

export default function PublicRoute({ children }) {
    // hooks
    const isLoggedIn = useAuth();

    return !isLoggedIn ? children : <Navigate to="/inbox" />;
}