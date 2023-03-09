import axios from "axios";
import { useState, useEffect } from "react";

import Cookies from "js-cookie";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";

function HomePage() {
	const [response, setResponse] = useState(null);
	const secretKey = process.env.REACT_APP_API_KEY;
	const [habit, setHabit] = useState({
		title: "",
	});

	const handleError = (err) => {
		console.warn(err);
	};

	const handleInput = (event) => {
		const { title, value } = event.target;
		setHabit({
			...habit,
			[title]: value,
		});
	};

	const fetchQuotes = async () => {
		try {
			const res = await axios.get(
				"https://quotes-inspirational-quotes-motivational-quotes.p.rapidapi.com/quote",
				{
					headers: {
						"X-RapidAPI-Key": secretKey,
						"X-RapidAPI-Host":
							"quotes-inspirational-quotes-motivational-quotes.p.rapidapi.com",
					},
					params: { token: "ipworld.info" },
				}
			);
			setResponse(res.data);
		} catch (err) {
			console.log(err);
		}
	};
	useEffect(() => {
		// Trigger the API Call
		fetchQuotes();
	}, []);

	const handleSubmit = async (event) => {
		event.preventDefault();
		setHabit({
			...habit,
		});
		const formData = new FormData();
		formData.append("title", habit.title);

		const options = {
			method: "POST",
			headers: {
				"X-CSRFToken": Cookies.get("csrftoken"),
			},
			body: formData,
		};

		const response = await fetch("/api_v1/add-habit/", options);
		const data = await response.json();
		setHabit([habit, data]);
		console.log(formData);
		console.log({ data });
	};

	return (
		<div className="homepage-wrapper">
			<Card className="homepage-top">
				<Card.Header as="h5">Streak: </Card.Header>
				<Card.Body>
					<blockquote className="blockquote mb-0">
						{response && <p>{response.text}</p>}
						<footer className="blockquote-footer">
							{response && response.author}
							<cite title="Source Title"></cite>
						</footer>
					</blockquote>
				</Card.Body>
			</Card>

			<section className="days-of-the-week">
				<h2>Days of the Week:</h2>
			</section>

			<section className="set-steps">
				<h2>Today's Steps: </h2>
				<Form onSubmit={handleSubmit}>
					<Form.Group className="mb-3" controlId="formBasicCheckbox">
						<Form.Check type="checkbox" label="Check me out" />
					</Form.Group>
					<Form.Group className="mb-3" controlId="habit-form">
						<Form.Label>Add Habit</Form.Label>
						<Form.Control
							type="text"
							className="form-control"
							name="text"
							value={habit.text}
							onChange={handleInput}
							placeholder="Add Habit"
						/>
					</Form.Group>

					<Button variant="primary" type="submit">
						Submit
					</Button>
				</Form>
			</section>

			<section className="completed-steps">
				<h2>Steps Completed: </h2>
			</section>
		</div>
	);
}

export default HomePage;
