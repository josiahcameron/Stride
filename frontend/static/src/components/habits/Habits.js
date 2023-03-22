import axios from "axios";

import { useState, useEffect, useRef } from "react";

import Cookies from "js-cookie";
import { Button, Form, Card, Col, Row } from "react-bootstrap";

import {
	CircularProgressbar,
	CircularProgressbarWithChildren,
	buildStyles,
} from "react-circular-progressbar";

import IncompleteHabits from "../habitHTML/IncompleteHabits";
import CompletedHabits from "../habitHTML/CompletedHabits";
import BankedHabits from "../habitHTML/BankedHabits";

const INITIAL_FORM_DATA = {
	title: "",

	frequency: "daily",
	is_active: true,
};

function Habits({ denominator, logUserActivity, setProgress }) {
	const csrftoken = Cookies.get("csrftoken");
	axios.defaults.headers.post["X-CSRFToken"] = csrftoken;
	axios.defaults.headers.get["X-CSRFToken"] = csrftoken;
	axios.defaults.headers.delete["X-CSRFToken"] = csrftoken;
	axios.defaults.headers.patch["X-CSRFToken"] = csrftoken;
	const handleError = (err) => {
		console.warn(err);
	};

	const [habits, setHabits] = useState(null);
	const [formData, setFormData] = useState(INITIAL_FORM_DATA);
	const [editMode, setEditMode] = useState(false);
	const [title, setTitle] = useState("");
	const [addHabit, setAddHabit] = useState(false);
	// const [activeHabits, setActiveHabits] = useState(0);
	const [habitLimit, setHabitLimit] = useState(false);

	//
	// ------------------Axios requests------------------
	//

	// Fetch habits
	useEffect(() => {
		const fetchHabits = async () => {
			const res = await axios.get("/api_v1/habits/");
			if (!res.status) {
				throw new Error("Network response was not OK");
			}
			const data = await res.data;
			setHabits(data);
		};
		// Trigger the API Call
		fetchHabits();
	}, []);

	if (habits === null || !habits.length) {
		return <div>Loading...</div>;
	}

	// if (habits.length) {
	// 	try {
	// 		setHabitsCompleted(
	// 			habits.filter(function (habit) {
	// 				return (
	// 					habit.is_completed === true && habit.is_active === true
	// 				);
	// 			}).length
	// 		);
	// 	} catch (err) {
	// 		console.log("Could not process");
	// 	}
	// 	try {
	// 		if (habitsCompleted > 0) {
	// 			setProgress(habitsCompleted / denominator);
	// 		}
	// 	} catch (err) {
	// 		console.log("Not good");
	// 	}
	// }
	//
	// ------------------Methods------------------
	//
	const updateHabit = (updatedHabit) => {
		const updatedHabits = [...habits];
		const index = habits.findIndex((habit) => habit.id === updatedHabit.id);
		updatedHabits[index] = updatedHabit;
		setHabits(updatedHabits);
	};

	const completeHabit = async (habit) => {
		// console.log({ firing: habit });
		// setHabitsCompleted()

		habit.is_completed = true;
		const completedHabits = habits.filter(
			(habit) => habit.is_completed === true
		).length;

		console.log(completedHabits);
		try {
			const response = await axios.post(`/api_v1/add-habit-meta/`, {
				habit: habit.id,
			});
			if (completedHabits / denominator >= 1) {
				logUserActivity();
			}
			setHabits([...habits]);
		} catch (err) {
			console.log(err);
		}
	};

	const incompleteHabit = async (habit) => {
		// console.log({ firing: habit });
		console.log(habit);
		habit.is_completed = false;
		const completedHabits = habits.filter(
			(habit) => habit.is_completed === true
		).length;

		try {
			const response = await axios.delete(
				`/api_v1/update-habit-meta/${habit.id}`
			);
		} catch (err) {
			console.log("Network response was not OK");
		}
		try {
			const response = await axios.patch(
				`/api_v1/update-habit/${habit.id}/`,
				habit
			);
			if (response.status !== 200) {
				throw new Error("Network response was not OK");
			}
			const data = response.data;
			setHabits([...habits]);
		} catch (error) {
			console.log(error);
		}
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
			setHabits([...habits]);
			const activeHabits = habits.filter(function (habit) {
				return habit.is_active === true;
			}).length;
			if (activeHabits >= denominator) {
				setHabitLimit(true);
			} else if (activeHabits < denominator) {
				setHabitLimit(false);
			}
		} catch (error) {
			console.log(error);
		}
	};

	const makeActive = async (habit) => {
		let activeHabits = habits.filter(function (habit) {
			return habit.is_active === true;
		}).length;
		if (activeHabits >= denominator) {
			setHabitLimit(true);
			setAddHabit(false);
		}
		if (activeHabits < denominator) {
			habit.is_active = true;
			try {
				const response = await axios.patch(
					`/api_v1/update-habit/${habit.id}/`,
					habit
				);
				if (response.status !== 200) {
					throw new Error("Network response was not OK");
				}
				const data = response.data;
				setHabits([...habits]);
			} catch (error) {
				console.log(error);
			}
			setHabitLimit(false);
			setAddHabit(false);
		}
	};

	const handleDelete = async (habit) => {
		try {
			const response = await axios.delete(
				`/api_v1/update-habit/${habit.id}`
			);
			const data = response.data;
		} catch (error) {
			console.log(error);
		}
		try {
			const res = await axios.get("/api_v1/habits/");
			setHabits(res.data);
			const activeHabits = habits.filter(function (habit) {
				return habit.is_active === true;
			}).length;
			if (activeHabits >= denominator) {
				setHabitLimit(true);
			} else if (activeHabits < denominator) {
				setHabitLimit(false);
				setAddHabit(false);
			}
		} catch (err) {
			console.log(err);
		}
		// const index = habits.indexOf(habit);
		// habits.splice([index, 1]);
		// console.log(habits);
		// setHabits(habits);
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

		let activeHabits = habits.filter(function (habit) {
			return habit.is_active === true;
		}).length;

		if (activeHabits >= denominator) {
			setHabitLimit(true);
		} else {
			const response = await axios.post("/api_v1/add-habit/", formData);
			const data = await response.data;
			setHabits([...habits, data]);
			activeHabits = habits.filter(function (habit) {
				return habit.is_active === true;
			}).length;
			if (!response.status) {
				throw new Error("Network response was not OK");
			}

			if (activeHabits >= denominator) {
				setHabitLimit(true);
			} else if (activeHabits < denominator) {
				setHabitLimit(false);
				setAddHabit(false);
			}
		}
	};
	//
	// ------------------HTML Mapping------------------
	//
	// Active and uncompleted habits
	const habitHTML = habits
		.filter(function (habit) {
			return habit.is_completed === false && habit.is_active === true;
		})
		.map((habit) => (
			<IncompleteHabits
				key={habit.id}
				habit={habit}
				habits={habits}
				setHabits={setHabits}
				incompleteHabit={incompleteHabit}
				setTitle={setTitle}
				setEditMode={setEditMode}
				editMode={editMode}
				completeHabit={completeHabit}
				title={title}
				makeInactive={makeInactive}
				updateHabit={updateHabit}
			/>
		));

	// Completed habits
	const completedHabitsHTML = habits
		.filter(function (habit) {
			return habit.is_completed === true && habit.is_active === true;
		})
		.map((habit) => (
			<CompletedHabits
				key={habit.id}
				habit={habit}
				incompleteHabit={incompleteHabit}
				handleDelete={handleDelete}
			/>
		));

	// Inactive habits
	const inactiveHabitsHTML = habits
		.filter(function (habit) {
			return habit.is_active === false;
		})
		.map((habit) => (
			<BankedHabits
				key={habit.id}
				handleDelete={handleDelete}
				habit={habit}
				makeActive={makeActive}
			/>
		));
	//
	// ------------------Render------------------
	//
	return (
		<>
			<div className="progress">
				<CircularProgressbarWithChildren
					value={45}
					strokeWidth={8}
					styles={buildStyles({
						pathColor: "#f00",
						trailColor: "transparent",
					})}
				></CircularProgressbarWithChildren>
			</div>
			<div className="box habit-list">
				<Col
					className={`${
						habitLimit ? "hide-form" : "hide"
					}row align-items-start habit-cards block`}
				>
					<h5>My Steps:</h5>
					{habits && habitHTML}

					<Row className="align-items-start col-md-4 ">
						<Card className="single-post mt-5 habit-card add-habit">
							<div
								className={`${
									habitLimit ? "hide-form" : "hide"
								}`}
							>
								You can't add any more at your current tier
							</div>
							<Button
								className={`${addHabit && "hide"}`}
								onClick={() => setAddHabit(true)}
							>
								Click here to add a new step
							</Button>
							<form
								className={`${addHabit ? "show-form" : "hide"}`}
							>
								<div
									id="input-box"
									className="form-group input-box"
								>
									<input
										className="form-control"
										id="title"
										type="text"
										name="title"
										// value={formData.title}
										onChange={handleInput}
									/>
									<label>Add Habit</label>
								</div>
								<Button
									onClick={handleSubmit}
									className="btn btn-primary btn-block "
								>
									Submit
								</Button>
								<Button onClick={() => setAddHabit(false)}>
									Cancel
								</Button>
							</form>
						</Card>
					</Row>
				</Col>

				<Col className="box completed-habits block">
					<h5>Completed Steps:</h5>
					<Row className=" row align-items-start habit-cards ">
						{habits && completedHabitsHTML}
					</Row>
				</Col>
			</div>
			<Row className="box banked-habits block">
				<h5>Habit Bank:</h5>

				<Row className=" row align-items-start habit-cards ">
					{habits && inactiveHabitsHTML}
				</Row>
			</Row>
		</>
	);
}

export default Habits;
