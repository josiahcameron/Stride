import { Button, Card, Col, Row } from "react-bootstrap";
import { BiAddToQueue } from "react-icons/bi";
import { BsFillTrashFill } from "react-icons/bs";
function BankedHabits({ handleDelete, habit, makeActive }) {
	return (
		<>
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
							<BiAddToQueue /> Add Habit
						</Button>

						<Button
							className="btn-danger delete-habit"
							onClick={() => {
								handleDelete(habit);
							}}
						>
							<BsFillTrashFill />
						</Button>
					</div>
				</Card>
			</div>
		</>
	);
}

export default BankedHabits;
