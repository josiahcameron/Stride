import axios from "axios";
import { createContext, useState, useEffect } from "react";
import { Button, Form, Card, Col, Row, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import Cookies from "js-cookie";

function CreateProfile() {
	const csrftoken = Cookies.get("csrftoken");
	axios.defaults.headers.post["X-CSRFToken"] = csrftoken;
	const navigate = useNavigate();
	const [profile, setProfile] = useState({
		display_name: "",
		avatar: null,
		tier: "first",
	});
	const [preview, setPreview] = useState("");
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
		navigate("/");
	};

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
												/>
												{profile.avatar && (
													<img src={preview} alt="" />
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
			</div>
		</>
	);
}

export default CreateProfile;
