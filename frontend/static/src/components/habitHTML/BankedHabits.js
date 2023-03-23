import { Button, Card, Col } from "react-bootstrap";
import { BiAddToQueue } from "react-icons/bi";
import { BsFillTrashFill } from "react-icons/bs";
function BankedHabits({ handleDelete, habit, makeActive }) {
	return (
		<>
			<Col key={habit.id} className="align-items-start col-md-4 ">
				<Card className="single-post habit-card mt-5">
					{habit.title}
					<div className="banked-habit-button">
						<Button
							className="danger delete-habit"
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
							<BsFillTrashFill /> Delete Habit
						</Button>
					</div>
				</Card>
			</Col>
		</>
	);
}

export default BankedHabits;
