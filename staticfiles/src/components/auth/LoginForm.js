import { useState, useContext } from "react";
import { Navigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { Button, Card, Col, Container, Form, Nav, Row } from "react-bootstrap";

const INITIAL_FORM_DATA = {
	username: "",
	password: "",
};

const LoginForm = () => {
	// Will deconstruct and retrieve these objects from the context
	const { isAuthenticated, login } = useContext(AuthContext);

	const [formData, setFormData] = useState(INITIAL_FORM_DATA);
	const [passwordShown, setPasswordShown] = useState(false);

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
		<div className="login-wrapper">
			<div className="wrapper">
				<Container>
					<Row className="vh-100 d-flex justify-content-center align-items-center">
						<Col md={8} lg={6} xs={12}>
							<Card className="px-4">
								<Card.Body>
									<div className="mb-3 mt-md-4">
										<h2 className="fw-bold mb-2 text-center text-uppercase ">
											Login Here
										</h2>
										<div className="mb-3">
											<Form className="registration-form">
												<Form.Group
													className="mb-3"
													controlId="username"
												>
													<Form.Label className="text-center">
														Username
													</Form.Label>
													<Form.Control
														type="username"
														placeholder="Enter username"
														name="username"
														value={
															formData.username
														}
														onChange={handleInput}
														autoComplete="off"
													/>
												</Form.Group>

												<Form.Group
													className="mb-3"
													controlId="formBasicPassword"
												>
													<Form.Label className="text-center">
														Password
													</Form.Label>
													<Form.Control
														type={
															passwordShown
																? "text"
																: "password"
														}
														placeholder="Enter password"
														name="password"
														value={
															formData.password
														}
														onChange={handleInput}
														autoComplete="off"
													/>
													<div className="password_checkbox">
														<Form.Check
															type="checkbox"
															id="custom-switch"
															className="show-password"
															label="Show password?"
															onClick={() =>
																passwordShown
																	? setPasswordShown(
																			false
																	  )
																	: setPasswordShown(
																			true
																	  )
															}
															checked={
																passwordShown
																	? true
																	: false
															}
														/>
													</div>
												</Form.Group>

												<Form.Group
													className="mb-3"
													controlId="formBasicCheckbox"
												></Form.Group>
												<div className="d-grid">
													<Button
														onClick={handleSubmit}
														variant="dark"
														type="submit"
													>
														Log In
													</Button>{" "}
												</div>
											</Form>
											<div className="mt-3 navigate-text">
												<NavLink
													className="nav-text text-center dark-text account-check"
													id="dark-text"
													to="/register"
												>
													Don't have an account?
												</NavLink>
											</div>
										</div>
									</div>
								</Card.Body>
							</Card>
						</Col>
					</Row>
				</Container>
			</div>
		</div>
	);
};

export default LoginForm;

{
	/* <Container className="login-container">
	<Row className="vh-100 d-flex justify-content-center align-items-center">
		<Col md={8} lg={6} xs={12}></Col>
		<Card className="px-4">
			<Card.Body>
				<div className="mb-3 mt-md-4">
					<h2 className="fw-bold mb-2 text-center text-uppercase ">
						Login Here
					</h2>
					<div className="mb-3">
						<Form className="login-form">
							{/* <div className="illustration">
				<i className="icon ion-ios-locked-outline">
					</i></div> 
							<Form.Group className="mb-3" controlId="username">
								<Form.Label className="text-center">
									Username
								</Form.Label>
								<Form.Control
									className="form-control"
									type="text"
									name="username"
									value={formData.username}
									onChange={handleInput}
									required
								/>
							</Form.Group>

							<Form.Group className="mb-3" controlId="username">
								<Form.Label className="text-center">
									Password
								</Form.Label>
								<Form.Control
									className="form-control"
									name="password"
									value={formData.password}
									onChange={handleInput}
									required
								/>{" "}
							</Form.Group>

							<Button
								onClick={handleSubmit}
								className="btn btn-primary btn-block"
								variant="dark"
							>
								Log In
							</Button>

							<NavLink
								className="nav-text dark-text"
								to="/register"
							></NavLink>
						</Form>
					</div>
				</div>
			</Card.Body>
		</Card>
	</Row>
</Container>; */
}
