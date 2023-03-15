import axios from "axios";

import { useState, useEffect } from "react";

import Cookies from "js-cookie";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import { Col } from "react-bootstrap";

function Habits({ habits, habit, setHabit_Meta }) {
	const [record, setRecord] = useState({
		type: "",
	});
	const handleError = (err) => {
		console.warn(err);
	};

	const submitRecord = async (event) => {
		event.preventDefault();

		const options = {
			method: "POST",
			headers: {
				"X-CSRFToken": Cookies.get("csrftoken"),
			},
		};
		try {
			const response = await axios.post(
				"/api_v1/add-record/",
				`type: ${event.target}`,
				options
			);
			const data = response.data;
			console.log(data);
		} catch (error) {
			handleError(error);
		}
	};

	const completeHabit = async (event) => {
		event.preventDefault();
		setHabit_Meta(true);

		const csrftoken = Cookies.get("csrftoken");

		// axios.defaults.headers.common["X-CSRFToken"] = csrftoken;

		const options = {
			method: "PATCH",
			headers: {
				"Content-Type": "application/json",
				"X-CSRFToken": csrftoken,
			},
		};

		const response = await axios.patch(
			`/api_v1/update-habit/${habit.id}/`,
			`is_complete: ${event.target}`,
			options
		);
		const data = response.data;
		console.log(data);
	};

	return (
		<Col key={habit.id}>
			<div className="post-container">
				<Card className="bg-dark text-white single-post h-100 w-80 mt-5">
					{/* <Card.Img src={article.image} alt="post-image" /> */}
					{/* <Card.ImgOverlay> */}
					<Card.Text>{habit.title}</Card.Text>
					<Card.Text>{habit.type}</Card.Text>
					<Form.Check
						type="checkbox"
						label="Completed"
						className="form-control mb-3"
						name="is_complete"
						value="true"
						onChange={completeHabit}
					/>
					{/* <div className="post-info flexbox">

						</div>
					</Card.ImgOverlay> */}
				</Card>
			</div>
		</Col>
	);
}

export default Habits;
