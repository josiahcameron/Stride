import { useContext } from "react";
import "./App.css";

import { Routes, Route } from "react-router-dom";
import { AuthContext } from "./components/context/AuthContext";

import APITest from "./apitest/APITest";

import LoginForm from "./components/auth/LoginForm";
import RegisterForm from "./components/auth/RegisterForm";
import HomePage from "./components/home/HomePage";
import ProtectedRoute from "./components/routes/ProtectedRoute";
import Header from "./components/header/Header";
import Profile from "./components/profile/Profile";
import HabitPage from "./components/pages/HabitPage";
import CreateProfile from "./components/pages/CreateProfile";
import JournalEntry from "./components/pages/JournalEntry";
import AuthenticatedHeader from "./components/header/AuthenticatedHeader";
import UnauthenticatedHeader from "./components/header/UnauthenticatedHeader";

const App = () => {
	const { isAuthenticated } = useContext(AuthContext);

	return (
		<>
			{/* {isAuthenticated ? (
				<AuthenticatedHeader />
			) : (
				<UnauthenticatedHeader />
			)} */}
			<Header />
			<div className="all-content-wrapper">
				<Routes>
					<Route path="login" element={<LoginForm />} />
					<Route path="register" element={<RegisterForm />} />
					<Route path="create-profile" element={<CreateProfile />} />
					<Route path="profile" element={<Profile />} />
					{/* <Route path="home" element={<HomePage />} /> */}
					<Route path="journal" element={<JournalEntry />} />

					<Route path="/" element={<ProtectedRoute />}>
						<Route index element={<HabitPage />} />
					</Route>
				</Routes>
				{/* <Footer /> */}
			</div>
		</>
	);
};

export default App;
