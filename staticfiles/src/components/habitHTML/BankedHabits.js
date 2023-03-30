import { Button, Card, Col, Row } from "react-bootstrap";

import { GoDiffAdded } from "react-icons/go";
import { BsFillTrashFill } from "react-icons/bs";

function BankedHabits({ handleDelete, habit, makeActive }) {
	return (
		<div key={habit.id} className="habit-cards col-md-8">
			<Card className="single-post habit-card mt-3">
				{habit.title}
				<div className="banked-habit-button">
					<Button
						className="activate-habit"
						onClick={() => {
							makeActive(habit);
						}}
					>
						<GoDiffAdded /> Add Step
					</Button>

					<Button
						className="btn-danger delete-habit"
						onClick={() => {
							handleDelete(habit);
						}}
					>
						<BsFillTrashFill /> Trash Step
					</Button>
				</div>
			</Card>
		</div>
	);
}

export default BankedHabits;
