import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";

// Context creates a central location for our stately values
export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
	// Front-end authentication filter for conditional rendering in React
	const [isAuthenticated, setIsAuthenticated] = useState(null);
	const navigate = useNavigate();
	const handleError = (err) => {
		console.warn(err);
	};
	const [user, setUser] = useState(null);
	const login = async (user) => {
		const csrftoken = Cookies.get("csrftoken");
		axios.defaults.headers.post["X-CSRFToken"] = csrftoken;
		const response = await axios.post("/dj-rest-auth/login/", user);
		if (!response.status) {
			throw new Error("Network response was not OK");
		}

		const data = await response.data;

		Cookies.set("Authorization", `Token ${data.key}`);
		setIsAuthenticated(true);
		if (isAuthenticated) {
			console.log("Authentication Successful");
		}
		console.log(isAuthenticated);
		navigate("/");
	};

	const register = async (user) => {
		const csrftoken = Cookies.get("csrftoken");
		axios.defaults.headers.post["X-CSRFToken"] = csrftoken;
		const response = await axios.post("/dj-rest-auth/registration/", user);
		if (!response.status) {
			throw new Error("Network response was not OK");
		}
		const data = await response.data;
		Cookies.set("Authorization", `Token ${data.key}`);
		setIsAuthenticated(true);
		navigate("/");
	};

	const logout = async () => {
		const csrftoken = Cookies.get("csrftoken");
		axios.defaults.headers.post["X-CSRFToken"] = csrftoken;
		await axios.post("/dj-rest-auth/logout/");

		Cookies.remove("Authorization");
		setIsAuthenticated(false);
		navigate("/login");
	};

	useEffect(() => {
		const getUser = async () => {
			// Fetch request to retrieve whoever is currently logged in
			const response = await axios.get("/dj-rest-auth/user/");

			if (!response.status) {
				setIsAuthenticated(false);

				return;
			}
			setUser(response.data);
			setIsAuthenticated(true);
		};

		getUser();
	}, []);

	if (isAuthenticated === null) {
		return <div>Is loading ...</div>;
	}

	return (
		<AuthContext.Provider
			value={{ isAuthenticated, login, register, logout, user }}
		>
			{children}
		</AuthContext.Provider>
	);
};
