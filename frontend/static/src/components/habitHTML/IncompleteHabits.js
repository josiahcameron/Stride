import axios from "axios";
import Cookies from "js-cookie";
import { useState, useEffect } from "react";

import { Button, Form, Card, Col } from "react-bootstrap";
function IncompleteHabits({
	habit,
	incompleteHabit,
	setEditMode,
	editMode,
	habits,
	completeHabit,
	setHabits,
	makeInactive,
	updateHabit,
}) {
	const csrftoken = Cookies.get("csrftoken");
	axios.defaults.headers.post["X-CSRFToken"] = csrftoken;
	axios.defaults.headers.get["X-CSRFToken"] = csrftoken;
	axios.defaults.headers.delete["X-CSRFToken"] = csrftoken;
	axios.defaults.headers.patch["X-CSRFToken"] = csrftoken;

	const [title, setTitle] = useState(habit.title);

	const saveEdit = async (e) => {
		const updatedHabit = { ...habit };
		updatedHabit.title = title;
		try {
			const response = await axios.patch(
				`api_v1/update-habit/${habit.id}/`,
				updatedHabit
			);
			setEditMode(false);
			const data = await response.json();
			updateHabit(data);
		} catch (err) {
			console.log(err);
		}
	};
	return (
		<>
			<Col key={habit.id} className="align-items-start col-md-4 ">
				<Card className="single-post habit-card mt-5">
					<Form.Check
						type="checkbox"
						className=" habit-checkbox border-0"
						onClick={() => {
							completeHabit(habit);
						}}
					/>
					<textarea
						id="title"
						name="title"
						type="text"
						className={`${!editMode && "input-preview"}`}
						disabled={!editMode}
						value={title}
						onChange={(e) => setTitle(e.target.value)}
					/>
					<div className="draft-options">
						{editMode ? (
							<button
								type="button"
								className="btn btn-primary save-button"
								onClick={(e) => saveEdit()}
							>
								Save
							</button>
						) : (
							<button
								type="button"
								className="btn btn-primary edit-button"
								onClick={() => setEditMode(true)}
							>
								Edit
							</button>
						)}

						<Button
							className="danger delete-habit"
							onClick={() => {
								makeInactive(habit);
							}}
						>
							Send to bank
						</Button>
					</div>
				</Card>
			</Col>
		</>
	);
}

export default IncompleteHabits;
