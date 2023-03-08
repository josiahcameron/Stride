import { useContext } from "react";
import "./App.css";

import { Routes, Route } from "react-router-dom";
import { AuthContext } from "./components/context/AuthContext";

import APITest from "./apitest/APITest";

import LoginForm from "./components/auth/LoginForm";
import RegisterForm from "./components/auth/RegisterForm";
import HomePage from "./components/home/HomePage";
import ProtectedRoute from "./components/routes/ProtectedRoute";

function App() {
	const { isAuthenticated } = useContext(AuthContext);

	return (
		<div>
			{/* {isAuthenticated ? <AuthenticatedHeader /> : <UnauthenticatedHeader />} */}
			<Routes>
				<Route path="login" element={<LoginForm />} />
				<Route path="register" element={<RegisterForm />} />
				<Route path="/" element={<ProtectedRoute />}>
					<Route index element={<HomePage />} />
				</Route>
			</Routes>
			{/* <Footer /> */}
		</div>
	);
}

export default App;
