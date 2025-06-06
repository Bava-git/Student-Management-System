import { Navigate, Outlet } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

function PrivateComponents({ allowedRoles }) {
    const role = sessionStorage.getItem("role");
    const token = sessionStorage.getItem("authtoken");

    return allowedRoles.includes(role) && isTokenValid(token) ? <Outlet /> : <Navigate to="/login" />;
}

export const isTokenValid = (token) => {
    if (!token) return false; // No token, block access

    try {
        const decoded = jwtDecode(token);
        const currentTime = Math.floor(Date.now() / 1000);

        const isValid = decoded.exp > currentTime;
        if (!isValid) {
            sessionStorage.clear();
        }

        return isValid;
    } catch (error) {
        console.error("token exprid:", error);
        return false;
    }
};

export default PrivateComponents;
