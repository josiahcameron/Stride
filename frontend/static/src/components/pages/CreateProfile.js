import axios from "axios";
import { createContext, useState, useEffect } from "react";
import { Button, Form, Card, Col, Row, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import Cookies from "js-cookie";

const INITIAL_FORM_DATA = {
	title: "",

	frequency: "daily",
	is_active: true,
};
function CreateProfile() {
	const csrftoken = Cookies.get("csrftoken");
	axios.defaults.headers.post["X-CSRFToken"] = csrftoken;
	axios.defaults.headers.get["X-CSRFToken"] = csrftoken;
	axios.defaults.headers.delete["X-CSRFToken"] = csrftoken;
	axios.defaults.headers.patch["X-CSRFToken"] = csrftoken;
	const handleError = (err) => {
		console.warn(err);
	};
	const navigate = useNavigate();
	const [profile, setProfile] = useState({
		display_name: "",
		avatar: null,
		tier: "first",
	});
	const [habits, setHabits] = useState(null);
	const [preview, setPreview] = useState("");
	const [addHabitMode, setAddHabitMode] = useState(true);
	const [formData, setFormData] = useState(INITIAL_FORM_DATA);
	let { profileId } = useParams();
	console.log({ profileId });

	const handleInput = (event) => {
		const { name, value } = event.target;

		setProfile({
			...profile,
			[name]: value,
		});
	};

	const handleImage = (event) => {
		const file = event.target.files[0];
		setProfile({
			...profile,
			avatar: file,
		});

		const reader = new FileReader();
		reader.onloadend = () => {
			setPreview(reader.result);
		};
		reader.readAsDataURL(file);
	};

	const createProfile = async (event) => {
		event.preventDefault();
		const formData = new FormData();
		formData.append("display_name", profile.display_name);
		formData.append("avatar", profile.avatar);

		const response = await axios.post("/api_v1/add-profile/", formData);
		const data = await response.data;
		console.log({ data });
		setAddHabitMode(true);
	};
	const handleSubmit = async (event) => {
		event.preventDefault();

		const response = await axios.post("/api_v1/add-habit/", formData);
		const data = await response.data;

		if (!response.status) {
			throw new Error("Network response was not OK");
		}
		navigate("/");
	};
	const handleHabit = (event) => {
		const { name, value } = event.target;
		setFormData((prevFormData) => ({
			...prevFormData,
			[name]: value,
		}));
	};

	return (
		<>
			<div className="wrapper">
				<Container className={`${!addHabitMode ? "" : "hide"}`}>
					<Row className="vh-100 d-flex justify-content-center align-items-center">
						<Col md={8} lg={6} xs={12}>
							<Card className="px-4">
								<Card.Body>
									<div className="mb-3 mt-md-4">
										<h2 className="fw-bold mb-2 text-center text-uppercase ">
											Register Here
										</h2>
										<div className="mb-3"></div>
										<Form
											className="registration-form"
											onSubmit={createProfile}
										>
											<Form.Group
												className="mb-3"
												controlId="display_name"
											>
												<Form.Label className="text-center">
													Enter the name you'd like to
													go by:
												</Form.Label>
												<Form.Control
													type="text"
													name="display_name"
													value={profile.display_name}
													onChange={handleInput}
												/>
											</Form.Group>
											<Form.Group
												className="mb-3"
												controlId="avatar"
											>
												<Form.Control
													type="file"
													name="avatar"
													onChange={handleImage}
													// className="add-profile-image"
												/>
												{profile.avatar && (
													<img
														src={preview}
														alt=""
														className="add-profile-image"
													/>
												)}
											</Form.Group>
											<div className="d-grid">
												<Button
													variant="primary"
													type="submit"
												>
													Create Profile
												</Button>
											</div>
										</Form>
									</div>
								</Card.Body>
							</Card>
						</Col>
					</Row>
				</Container>

				{/* ------------------------ Add initial habit -------------------------- */}
				<Container>
					<Row className="vh-100 d-flex justify-content-center align-items-center">
						<Col>
							<Card className="px-4 login-card">
								<form
									className={`${
										addHabitMode ? "show-form" : "hide"
									}`}
								>
									<label className="text-center">
										Let's add a daily goal to set! Keep it
										simple for now - add a simple goal you
										can check off during your day
									</label>
									<div
										id="input-box"
										className="form-group input-box"
									>
										<input
											className="form-control"
											id="title"
											type="text"
											name="title"
											placeholder="Enter habit here"
											onChange={handleHabit}
										/>
									</div>
									<Button
										onClick={handleSubmit}
										className="btn btn-primary btn-block "
									>
										Submit
									</Button>
								</form>
								<Card.Body>
									<div className="mb-3 mt-md-4">
										<h2 className="fw-bold mb-2 text-center text-uppercase ">
											Login Here
										</h2>
										<div className="mb-3">
											<Form className="registration-form">
												<Form.Group
													className="mb-4 mt-3"
													controlId="username"
												>
													<Form.Label className="text-center">
														<h4>Username</h4>
													</Form.Label>
													<Form.Control
														type="username"
														placeholder="Enter username"
														name="username"
														value={
															formData.username
														}
														onChange={handleHabit}
														autoComplete="off"
													/>
												</Form.Group>

												<Form.Group
													className="mb-4"
													controlId="formBasicPassword"
												>
													<Form.Label className="text-center">
														<h4>Password</h4>
													</Form.Label>

													<div className="password_checkbox"></div>
												</Form.Group>

												<Form.Group
													className="mb-3"
													controlId="formBasicCheckbox"
												></Form.Group>
												<div className="d-grid">
													<Button
														onClick={handleSubmit}
														variant="primary"
														type="submit"
													>
														Log In
													</Button>{" "}
												</div>
											</Form>
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
}

export default CreateProfile;
