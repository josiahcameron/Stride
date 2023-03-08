import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

// Context creates a central location for our stately values
export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
	// Front-end authentication filter for conditional rendering in React
	const [isAuthenticated, setIsAuthenticated] = useState(null);
	const navigate = useNavigate();

	const login = async (user) => {
		const options = {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"X-CSRFToken": Cookies.get("csrftoken"),
			},
			body: JSON.stringify(user),
		};

		const response = await fetch("/dj-rest-auth/login/", options);

		if (!response.ok) {
			throw new Error("Network response was not OK");
		}
		const data = await response.json();
		Cookies.set("Authorization", `Token ${data.key}`);
		setIsAuthenticated(true);
		navigate("/");
	};

	const register = async (user) => {
		const options = {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"X-CSRFToken": Cookies.get("csrftoken"),
			},
			body: JSON.stringify(user),
		};

		const response = await fetch("/dj-rest-auth/registration/", options);

		if (!response.ok) {
			throw new Error("Network response was not OK");
		}
		const data = await response.json();
		Cookies.set("Authorization", `Token ${data.key}`);
		setIsAuthenticated(true);
		navigate("/");
	};

	const logout = async () => {
		const options = {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"X-CSRFToken": Cookies.get("csrftoken"),
			},
		};

		await fetch("/dj-rest-auth/logout/", options);
		Cookies.remove("Authorization");
		setIsAuthenticated(false);
		navigate("/login");
	};

	useEffect(() => {
		const getUser = async () => {
			// Fetch request to retrieve whoever is currently logged in
			const response = await fetch("/dj-rest-auth/user/");

			if (!response.ok) {
				setIsAuthenticated(false);
				return;
			}

			setIsAuthenticated(true);
		};

		getUser();
	}, []);

	if (isAuthenticated === null) {
		return <div>Is loading ...</div>;
	}

	return (
		<AuthContext.Provider
			value={{ isAuthenticated, login, register, logout }}
		>
			{children}
		</AuthContext.Provider>
	);
};
