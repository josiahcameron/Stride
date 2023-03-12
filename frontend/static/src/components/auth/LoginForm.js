import { useState, useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const INITIAL_FORM_DATA = {
	username: "",
	password: "",
};

const LoginForm = () => {
	// Will deconstruct and retrieve these objects from the context
	const { isAuthenticated, login } = useContext(AuthContext);

	const [formData, setFormData] = useState(INITIAL_FORM_DATA);

	const handleInput = (event) => {
		const { name, value } = event.target;
		setFormData((prevFormData) => ({
			...prevFormData,
			[name]: value,
		}));
	};

	// login is a function given by the context; will send a post request with the formData to log the user in
	const handleSubmit = (event) => {
		event.preventDefault();
		console.log(formData);
		login(formData);
	};

	if (isAuthenticated) {
		return <Navigate to="/" />;
	}

	return (
		<div className="login-container">
			<div className="login-dark">
				<form>
					<h2 className="sr-only">Login Form</h2>
					{/* <div className="illustration">
				<i className="icon ion-ios-locked-outline">
					</i></div> */}
					<div className="form-group input-box">
						<input
							className="form-control"
							id="username"
							type="text"
							name="username"
							value={formData.username}
							onChange={handleInput}
							required
						/>
						<label>Enter Username</label>
					</div>

					<div className="form-group input-box">
						<input
							className="form-control"
							id="password"
							type="password"
							name="password"
							value={formData.password}
							onChange={handleInput}
							required
						/>
						<label>Enter Password</label>
						<div class="password_checkbox">
							<input type="checkbox" />
							<p>Show Password</p>
						</div>
					</div>
					<div class="forgot_password">
						<a href="forgot">Forgot Password ?</a>
					</div>
					{/* <div className="form-group login-button-box"> */}
					<button
						onClick={handleSubmit}
						className="btn btn-primary btn-block login-button"
					>
						Log In
					</button>
					{/* </div> */}
					<div class="signup_link">
						<a href="signup.html">Don't have an Account ?</a>
					</div>
				</form>
			</div>
		</div>
	);
};

export default LoginForm;
