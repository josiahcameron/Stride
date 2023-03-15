import { useState, useEffect, useContext } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import {
	CircularProgressbar,
	CircularProgressbarWithChildren,
	buildStyles,
} from "react-circular-progressbar";
import { easeQuadInOut } from "d3-ease";

import { Card, Form, Col, Row, Container, Button } from "react-bootstrap";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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

function HabitPage() {
	const csrftoken = Cookies.get("csrftoken");
	axios.defaults.headers.post["X-CSRFToken"] = csrftoken;
	axios.defaults.headers.get["X-CSRFToken"] = csrftoken;
	axios.defaults.headers.delete["X-CSRFToken"] = csrftoken;
	axios.defaults.headers.patch["X-CSRFToken"] = csrftoken;
	const { user } = useContext(AuthContext);
	const handleError = (err) => {
		console.warn(err);
	};

	const [profile, setProfile] = useState(null);
	const [tier, setTier] = useState(null);
	const [habits, setHabits] = useState(null);
	const [habitCompletion, setHabitCompletion] = useState(false);
	const [quote, setQuote] = useState(INITIAL_QUOTE);
	const [formData, setFormData] = useState(INITIAL_FORM_DATA);

	// if (habits){const denominator = habits.length;
	let habitsCompleted = 0;
	let denominator = 0;
	let maxHabits = denominator;
	let habitCount = 0;
	if (habits) {
		habitCount = habits.length;
	}
	const incrementHabit = async (habit) => {
		// habit.completed = true;
		// habitsCompleted += 1;

		const response = await axios.post(`/api_v1/add-habit-meta/`, {
			habit: habit.id,
		});
		if (!response.status) {
			throw new Error("Network response was not OK");
		}
	};
	// const decrementHabit = async (habit) => {
	// 	habit.completed = false;
	// 	habitsCompleted -= 1;

	// 	const response = await axios.delete(
	// 		`/api_v1/update-habit-meta/${habit.id}/`
	// 	);
	// 	if (!response.status) {
	// 		throw new Error("Network response was not OK");
	// 	}
	// };

	const handleDelete = async (habit) => {
		try {
			const response = await axios.delete(
				`/api_v1/update-habit/${habit.id}`
			);
			if (response.status !== 200) {
				throw new Error("Network response was not OK");
			}
			const data = response.data;
		} catch (error) {
			console.error(error);
		}
	};

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

	useEffect(() => {
		const fetchProfile = async () => {
			try {
				const response = await axios.get(`/api_v1/profile/`);
				setProfile(response.data[0]);
				setTier(response.data[0].tier);
				setDenominator(tier);
			} catch (err) {
				console.log(err);
			}
		};
		// Trigger the API Call
		fetchProfile();
	}, []);

	const setDenominator = (tier) => {
		switch (tier) {
			case "first":
				denominator = 4;
				break;
			case "second":
				denominator = 6;
				break;
			case "third":
				denominator = 8;
				break;
			case "fourth":
				denominator = 10;
				break;
			case "fifth":
				denominator = 10;
				break;
			case "master":
				denominator = 15;
				break;
			default:
				console.log("error");
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

	const habitHTML = habits.map((habit) => (
		<Col key={habit.id} className="align-items-start col-md-4 ">
			<Card className="single-post habit-card mt-5">
				{/* <Card.Img src={article.image} alt="post-image" /> */}
				{/* <Card.ImgOverlay> */}
				<Form.Check
					type="checkbox"
					className=" habit-checkbox border-0"
					id={habit.title}
					label={habit.title}
					onClick={() => incrementHabit(habit)}
					// 		: decrementHabit(habit);
					// }}
				/>
				{/* <div className="post-info flexbox">

						</div>
					</Card.ImgOverlay> */}
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
	return (
		<div className="habit-page wrapper">
			<div className="box progress-qotd">
				<section className="progress-QOTD">
					<div className="progress">
						<CircularProgressbarWithChildren
							value={75}
							strokeWidth={8}
							styles={buildStyles({
								pathColor: "#f00",
								trailColor: "transparent",
							})}
						>
							{/*
          Width here needs to be (100 - 2 * strokeWidth)% 
          in order to fit exactly inside the outer progressbar.
        */}
							<div style={{ width: "84%" }}>
								<CircularProgressbarWithChildren
									value={70}
									styles={buildStyles({
										trailColor: "transparent",
									})}
								>
									<div style={{ width: "84%" }}>
										<CircularProgressbar
											value={70}
											styles={buildStyles({
												pathColor: "green",
												trailColor: "transparent",
											})}
										/>
									</div>
								</CircularProgressbarWithChildren>
							</div>
						</CircularProgressbarWithChildren>
					</div>
					<div className="qotd-container">
						<div className="qotd">
							<p className="quote">{quote[0].text}</p>
							<p className="quote-author">- {quote[0].author}</p>
						</div>
					</div>
				</section>
			</div>
			<div className="habit-type-selection-wrapper">
				<h5>My Steps:</h5>
				<section className="habit-type-selection-navbar">
					<ul className="nav nav-pills nav-fill">
						<li className="nav-item">
							<a
								className="nav-link active"
								aria-current="page"
								href="c"
							>
								Daily Strolls
							</a>
						</li>
						<li className="nav-item">
							<a
								className="nav-link "
								aria-current="page"
								href="c"
							>
								Weekly Jaunts
							</a>
						</li>
						<li className="nav-item">
							<a
								className="nav-link "
								aria-current="page"
								href="c"
							>
								Monthly Treks
							</a>
						</li>
						<li className="nav-item">
							<a
								className="nav-link "
								aria-current="page"
								href="c"
							>
								Overview
							</a>
						</li>
					</ul>
				</section>
			</div>
			<div className="box habit-list">
				{/* <Container className="m-0  habit-container "> */}
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
				{/* </Container> */}
			</div>
		</div>
	);
}

export default HabitPage;
