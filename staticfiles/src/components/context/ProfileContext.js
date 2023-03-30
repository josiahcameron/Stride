// import { createContext, useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import Cookies from "js-cookie";
// import axios from "axios";

// // Context creates a central location for our stately values
// export const ProfileContext = createContext();

// export const ProfileContextProvider = ({ children }) => {
// 	// Front-end authentication filter for conditional rendering in React
// 	const csrftoken = Cookies.get("csrftoken");
// 	axios.defaults.headers.post["X-CSRFToken"] = csrftoken;
// 	axios.defaults.headers.get["X-CSRFToken"] = csrftoken;
// 	axios.defaults.headers.delete["X-CSRFToken"] = csrftoken;
// 	axios.defaults.headers.patch["X-CSRFToken"] = csrftoken;

// 	const navigate = useNavigate();
// 	const handleError = (err) => {
// 		console.warn(err);
// 	};
// 	const [profile, setProfile] = useState(null);

// 	useEffect(() => {
// 		const fetchProfile = async () => {
// 			try {
// 				const response = await axios.get(`/api_v1/profile/`);
// 				const data = await response.data[0];
// 				setProfile(data);
// 			} catch (err) {
// 				console.log(err);
// 			}
// 		};
// 		// Trigger the API Call
// 		fetchProfile();
// 	}, []);
// 	if (profile === null) {
// 		return <div>Loading...</div>;
// 	}

// 	return (
// 		<ProfileContext.Provider
// 			value={{
// 				profile,
// 				setProfile,
// 			}}
// 		>
// 			{children}
// 		</ProfileContext.Provider>
// 	);
// };
