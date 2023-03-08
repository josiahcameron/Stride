import { useState, useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { Button, Form, Card, Col, Row, Container } from "react-bootstrap";

const INITIAL_FORM_DATA = {
	username: "",
	email: "",
	password1: "",
	password2: "",
};

const RegisterForm = () => {
	const { isAuthenticated, register } = useContext(AuthContext);

	const [formData, setFormData] = useState(INITIAL_FORM_DATA);
	const [passwordMatch, setPasswordMatch] = useState(true);

	const handleInput = (event) => {
		const { name, value } = event.target;
		setFormData((prevFormData) => ({
			...prevFormData,
			[name]: value,
		}));
	};

	const registerUser = (event) => {
		event.preventDefault();
		if (formData.password1 === formData.password2) {
			// submit the form data
			register(formData);
			console.log(formData);
		} else {
			setPasswordMatch(false);
		}
	};

	if (isAuthenticated) {
		return <Navigate to="/" />;
	}

	return (
		<>
			<div className="wrapper">
				<Container>
					<Row className="vh-100 d-flex justify-content-center align-items-center">
						<Col md={8} lg={6} xs={12}>
							<Card className="px-4">
								<Card.Body>
									<div className="mb-3 mt-md-4">
										<h2 className="fw-bold mb-2 text-center text-uppercase ">
											Register Here
										</h2>
										<div className="mb-3">
											<Form
												className="registration-form"
												onSubmit={registerUser}
											>
												<Form.Group
													className="mb-3"
													controlId="username"
												>
													<Form.Label className="text-center">
														Username
													</Form.Label>
													<Form.Control
														id="username"
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
													controlId="formBasicEmail"
												>
													<Form.Label className="text-center">
														Email address
													</Form.Label>
													<Form.Control
														id="email"
														type="email"
														placeholder="Enter email"
														name="email"
														value={formData.email}
														onChange={handleInput}
														autoComplete="off"
													/>
												</Form.Group>

												<Form.Group
													className="mb-3"
													controlId="formBasicPassword"
												>
													<Form.Label>
														Password
													</Form.Label>
													<Form.Control
														id="password1"
														type="password"
														placeholder="Enter password"
														name="password1"
														value={
															formData.password1
														}
														onChange={handleInput}
														autoComplete="off"
													/>
												</Form.Group>
												<Form.Group
													className="mb-3"
													controlId="formBasicPassword"
												>
													<Form.Label>
														Confirm Password
													</Form.Label>
													<Form.Control
														id="password2"
														type="password"
														placeholder="Confirm Password"
														name="password2"
														value={
															formData.password2
														}
														onChange={handleInput}
														autoComplete="off"
													/>
													{!passwordMatch && (
														<Form.Text className="text-danger">
															Passwords do not
															match.
														</Form.Text>
													)}
												</Form.Group>
												<Form.Group
													className="mb-3"
													controlId="formBasicCheckbox"
												></Form.Group>
												<div className="d-grid">
													<Button
														variant="primary"
														type="submit"
													>
														Create Account
													</Button>
												</div>
											</Form>
											<div className="mt-3">
												<p className="mb-0  text-center">
													Already have an account??{" "}
													<a
														href="{''}"
														className="text-primary fw-bold"
													>
														Sign In
													</a>
												</p>
											</div>
										</div>
									</div>
								</Card.Body>
							</Card>
						</Col>
					</Row>
				</Container>
			</div>
		</>
	);
};

export default RegisterForm;
