import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

export const RequireRole = ({ roles=[], children}) => {
    const { user } = useContext(AuthContext);

    if (!user) {
        return <Navigate to="/login" replace />; 
    }

    if (roles.length > 0 && !roles.includes(user.rol)) {
        return <Navigate to="/" replace />;
    }

    return children;
}