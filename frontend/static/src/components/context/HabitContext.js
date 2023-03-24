import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";

// Context creates a central location for our stately values
export const HabitContext = createContext();

export const HabitContextProvider = ({ children }) => {
	// Front-end authentication filter for conditional rendering in React
	const csrftoken = Cookies.get("csrftoken");
	axios.defaults.headers.post["X-CSRFToken"] = csrftoken;
	axios.defaults.headers.get["X-CSRFToken"] = csrftoken;
	axios.defaults.headers.delete["X-CSRFToken"] = csrftoken;
	axios.defaults.headers.patch["X-CSRFToken"] = csrftoken;

	const navigate = useNavigate();
	const handleError = (err) => {
		console.warn(err);
	};

	const [habits, setHabits] = useState(null);

	// Fetch habits
	useEffect(() => {
		const fetchHabits = async () => {
			const res = await axios.get("/api_v1/habits/");
			if (!res.status) {
				throw new Error("Network response was not OK");
			}
			const data = await res.data;
			setHabits(data);
		};
		// Trigger the API Call
		fetchHabits();
	}, []);

	if (habits === null || !habits.length) {
		return <div>Loading...</div>;
	}
	return (
		<HabitContext.Provider
			value={{
				habits,
			}}
		>
			{children}
		</HabitContext.Provider>
	);
};
