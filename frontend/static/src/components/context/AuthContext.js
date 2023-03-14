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

	const login = async (user) => {
		const options = {
			method: "POST",
			headers: {
				"X-CSRFToken": Cookies.get("csrftoken"),
			},
		};

		try {
			const response = await axios.post(
				"/dj-rest-auth/login/",
				user,
				options
			);
			const data = await response.json();
			Cookies.set("Authorization", `Token ${data.key}`);
			setIsAuthenticated(true);
			navigate("/profile");
		} catch (error) {
			handleError(error);
		}
	};

	const register = async (user) => {
		const csrfToken = document
			.querySelector('meta[name="csrf-token"]')
			.getAttribute("content");

		axios.defaults.headers.common["X-CSRF-TOKEN"] = csrfToken;

		console.log(user);

		try {
			const response = await axios.post(
				"/dj-rest-auth/registration/",
				user
			);
			const data = await response.json();
			Cookies.set("Authorization", `Token ${data.key}`);
			setIsAuthenticated(true);
			navigate("/");
		} catch (error) {
			handleError(error);
		}
	};

	const logout = async () => {
		const csrfToken = document
			.querySelector('meta[name="csrf-token"]')
			.getAttribute("content");

		axios.defaults.headers.common["X-CSRF-TOKEN"] = csrfToken;
		try {
			const response = await axios.post("/dj-rest-auth/logout/");
			const data = await response.json();
			Cookies.set("Authorization", `Token ${data.key}`);
			setIsAuthenticated(true);
			navigate("/login");
		} catch (error) {
			handleError(error);
		}
	};

	useEffect(() => {
		const getUser = async () => {
			// Fetch request to retrieve whoever is currently logged in
			const response = await axios.get("/dj-rest-auth/user/");

			if (!response.ok) {
				setIsAuthenticated(false);
				return;
			}

			setIsAuthenticated(true);
		};

		getUser();
	}, []);

	// if (isAuthenticated === null) {
	// 	return <div>Is loading ...</div>;
	// }

	return (
		<AuthContext.Provider
			value={{ isAuthenticated, login, register, logout }}
		>
			{children}
		</AuthContext.Provider>
	);
};
