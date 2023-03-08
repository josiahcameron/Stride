import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const ProtectedRoute = () => {
	const { isAuthenticated } = useContext(AuthContext);

	// If the user isn't authenticated, they'll be navigated to the login page
	if (!isAuthenticated) {
		return <Navigate to="/login" />;
	}

	// Otherwise, render the protected component (the home page)
	return <Outlet />;
};

export default ProtectedRoute;
