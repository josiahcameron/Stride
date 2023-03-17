import axios from "axios";

import { useState, useEffect } from "react";

import Cookies from "js-cookie";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import { Col, Row } from "react-bootstrap";

const INITIAL_FORM_DATA = {
	title: "",

	frequency: "daily",
	is_active: true,
};

const INITIAL_QUOTE = [
	{
		text: "The way I see it, if you want the rainbows, you gotta put up with the rain",
		author: "Dolly Parton",
	},
];

function Habits({ denominator }) {
	const csrftoken = Cookies.get("csrftoken");
	axios.defaults.headers.post["X-CSRFToken"] = csrftoken;
	axios.defaults.headers.get["X-CSRFToken"] = csrftoken;
	axios.defaults.headers.delete["X-CSRFToken"] = csrftoken;
	axios.defaults.headers.patch["X-CSRFToken"] = csrftoken;
	const handleError = (err) => {
		console.warn(err);
	};

	const [habits, setHabits] = useState(null);
	const [habitCompletion, setHabitCompletion] = useState(false);
	const [formData, setFormData] = useState(INITIAL_FORM_DATA);

	let habitsCompleted = 0;
	let maxHabits = denominator;
	let habitCount = 0;

	useEffect(() => {
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

	const completeHabit = async (habit) => {
		console.log({ firing: habit });
		// habit.completed = true;
		// habitsCompleted += 1;

		const response = await axios.post(`/api_v1/add-habit-meta/`, {
			habit: habit.id,
		});
		if (!response.status) {
			throw new Error("Network response was not OK");
		}
	};

	const incompleteHabit = async (habit) => {
		// habit.completed = false;
		// habitsCompleted -= 1;
		console.log(habit);
		habit.is_completed = false;

		const response = await axios.delete(
			`/api_v1/update-habit-meta/${habit.id}`,

			{ data: { habit: habit } }
		);

		if (response.status !== 200)
			throw new Error("Network response was not OK");

		const data = response.data;
	};

	const makeInactive = async (habit) => {
		habit.is_active = false;
		try {
			const response = await axios.patch(
				`/api_v1/update-habit/${habit.id}/`,
				habit
			);
			if (response.status !== 200) {
				throw new Error("Network response was not OK");
			}
			const data = response.data;
			setHabits([...habits, data]);
		} catch (error) {
			console.log(error);
		}
	};

	const handleDelete = async (habit) => {
		try {
			const response = await axios.delete(`/api_v1/update-habit/`, habit);
			if (response.status !== 200) {
				throw new Error("Network response was not OK");
			}
			const data = response.data;
		} catch (error) {
			console.error(error);
		}
	};
	const handleInput = (event) => {
		const { name, value } = event.target;
		setFormData((prevFormData) => ({
			...prevFormData,
			[name]: value,
		}));
	};

	const handleSubmit = async (event) => {
		event.preventDefault();

		const response = await axios.post("/api_v1/add-habit/", formData);
		const data = await response.data;
		setHabits([...habits, formData]);

		if (!response.status) {
			throw new Error("Network response was not OK");
		}
	};

	if (habits === null) {
		return <div>Is loading ...</div>;
	}
	habitCount = habits.length;
	// Active and uncompleted habits
	const habitHTML = habits
		.filter(function (habit) {
			return habit.is_completed === false && habit.is_active === true;
		})
		.map((habit) => (
			<Col key={habit.id} className="align-items-start col-md-4 ">
				<Card className="single-post habit-card mt-5">
					<Form.Check
						type="checkbox"
						className=" habit-checkbox border-0"
						label={habit.title}
						onClick={() => {
							completeHabit(habit);
						}}
					/>

					<Button
						className="danger delete-habit"
						onClick={() => {
							makeInactive(habit);
						}}
					>
						Send to bank
					</Button>
				</Card>
			</Col>
		));

	// Completed habits
	const completedHabitsHTML = habits
		.filter(function (habit) {
			return habit.is_completed === true && habit.is_active === true;
		})
		.map((habit) => (
			<Col key={habit.id} className="align-items-start col-md-4 ">
				<Card className="single-post habit-card mt-5">
					<Form.Check
						type="checkbox"
						className=" habit-checkbox border-0"
						label={habit.title}
						onClick={() => {
							incompleteHabit(habit);
						}}
					/>
				</Card>
				<Button
					className="danger delete-habit"
					onClick={() => {
						handleDelete(habit);
					}}
				>
					Delete Habit
				</Button>
			</Col>
		));

	// Inactive habits
	const inactiveHabitsHTML = habits
		.filter(function (habit) {
			return habit.is_active === false;
		})
		.map((habit) => (
			<Col key={habit.id} className="align-items-start col-md-4 ">
				<Card className="single-post habit-card mt-5">
					{habit.title}
					<Button
						className="danger delete-habit"
						onClick={() => {
							handleDelete(habit);
						}}
					>
						Delete Habit
					</Button>
				</Card>
			</Col>
		));

	return (
		<>
			<div className="box habit-list">
				<Row className=" row align-items-start habit-cards ">
					{habits && habitHTML}
					<Col className="align-items-start col-md-4 ">
						<Card className="single-post mt-5 habit-card add-habit">
							<form>
								<div className="form-group input-box">
									<input
										className="form-control"
										id="title"
										type="text"
										name="title"
										value={formData.title}
										onChange={handleInput}
									/>
									<label>Add Habit</label>
								</div>
								<button
									onClick={handleSubmit}
									className="btn btn-primary btn-block"
								>
									Submit
								</button>
							</form>
						</Card>
					</Col>
				</Row>
			</div>
			<div className="box completed-habits">
				<h5>Completed Steps:</h5>
				<Row className=" row align-items-start habit-cards ">
					{habits && completedHabitsHTML}
				</Row>
			</div>
			<div className="box banked-habits">
				<h5>Habit Bank:</h5>
				<Row className=" row align-items-start habit-cards ">
					{habits && inactiveHabitsHTML}
				</Row>
			</div>
		</>
	);
}

export default Habits;
