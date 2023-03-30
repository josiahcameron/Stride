import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthContextProvider } from "./components/context/AuthContext";
import { ProfileContextProvider } from "./components/context/ProfileContext";
import { HabitContextProvider } from "./components/context/HabitContext";
import "./index.css";
import "bootstrap/dist/css/bootstrap.css";
import "react-circular-progressbar/dist/styles.css";
import "d3-ease";

import "@fortawesome/react-fontawesome";
import "@fortawesome/fontawesome-svg-core";
import "@fortawesome/free-solid-svg-icons";
import "react-icons";
import "@mui/material";

import App from "./App";
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<React.StrictMode>
		<Router>
			{/* Context provider wraps around the root component  */}

			<AuthContextProvider>
				{/* <ProfileContextProvider> */}
				{/* <HabitContextProvider> */}
				<App />
				{/* </HabitContextProvider> */}
				{/* </ProfileContextProvider> */}
			</AuthContextProvider>
		</Router>
	</React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
