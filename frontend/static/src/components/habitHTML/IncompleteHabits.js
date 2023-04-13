import axios from "axios";
import Cookies from "js-cookie";
import { useState, useEffect } from "react";

import { AiFillEdit } from "react-icons/ai";
import { GrStorage } from "react-icons/gr";

import {
	Button,
	Form,
	Card,
	Col,
	Row,
	OverlayTrigger,
	Tooltip,
} from "react-bootstrap";

function IncompleteHabits({
	habit,
	incompleteHabit,

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
	const [editMode, setEditMode] = useState(false);

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
		<div key={habit.id} className="habit-cards">
			<Card className="single-post habit-card mt-3 md">
				<div className="habit-check">
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
				</div>
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
						<OverlayTrigger
							placement="top"
							overlay={<Tooltip>Edit</Tooltip>}
						>
							<button
								type="button"
								className="btn btn-primary edit-button"
								onClick={() => setEditMode(true)}
							>
								<AiFillEdit />
							</button>
						</OverlayTrigger>
					)}
					<OverlayTrigger
						placement="top"
						overlay={<Tooltip>Send to Storage</Tooltip>}
					>
						<Button
							className="danger deactivate-habit"
							onClick={() => {
								makeInactive(habit);
							}}
						>
							<GrStorage />
						</Button>
					</OverlayTrigger>
				</div>
			</Card>
		</div>
	);
}

export default IncompleteHabits;
