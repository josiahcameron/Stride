import axios from "axios";

import { useState, useEffect } from "react";

import Habits from "../../habits/Habits";

import Cookies from "js-cookie";
import { AuthContext } from "../context/AuthContext";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import { Col } from "react-bootstrap";

function HomePage() {
	const [response, setResponse] = useState(null);
	const secretKey = process.env.REACT_APP_API_KEY;
	const [habits, setHabits] = useState(null);
	const [habit, setHabit] = useState({
		title: "",
	});

	useEffect(() => {
		console.log("firing");
		const fetchHabits = async () => {
			try {
				const res = await axios.get("/api_v1/habits/");
				setHabits(res.data);
			} catch (err) {
				console.log(err);
			}
		};
		// Trigger the API Call
		fetchHabits();
	}, []);

	const handleError = (err) => {
		console.warn(err);
	};

	const handleInput = (event) => {
		const { name, value } = event.target;
		setHabit({
			...habit,
			[name]: value,
		});
	};

	useEffect(() => {
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
		// Trigger the API Call
		fetchQuotes();
	}, [secretKey]);

	const handleSubmit = async (event) => {
		event.preventDefault();
		setHabit({
			...habit,
		});
		const options = {
			method: "POST",
			headers: {
				"X-CSRFToken": Cookies.get("csrftoken"),
			},
		};
		try {
			const response = await axios.post(
				"/api_v1/add-habit/",
				habit,
				options
			);
			const data = response.data;
			console.log(data);
			setHabits([...habits, data]);
		} catch (error) {
			handleError(error);
		}
	};

	if (habits === null) {
		return <div>Is loading ...</div>;
	}

	const habitsHTML = habits.map((habit) => (
		<Habits key={habit.id} habit={habit} habits={habits} />
	));

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
				<Card>
					<Card.Body>
						<Form onSubmit={handleSubmit}>
							<Form.Group
								className="mb-3"
								controlId="formBasicCheckbox"
							>
								<Form.Check
									type="checkbox"
									label="Check me out"
								/>
							</Form.Group>
							<Form.Group className="mb-3" controlId="habit-form">
								<Form.Label>Add Habit</Form.Label>
								<Form.Control
									type="text"
									className="form-control"
									name="title"
									value={habit.title}
									onChange={handleInput}
									placeholder="Add Habit"
								/>
							</Form.Group>

							<Button variant="primary" type="submit">
								Submit
							</Button>
						</Form>
					</Card.Body>
				</Card>
				<Col>{habits && habitsHTML}</Col>
			</section>

			<section className="completed-steps">
				<h2>Steps Completed: </h2>
			</section>
		</div>
	);
}

export default HomePage;
