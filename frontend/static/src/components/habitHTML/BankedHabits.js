import { Button, Card, Col } from "react-bootstrap";
function BankedHabits({ handleDelete, habit, makeActive }) {
	return (
		<>
			<Col key={habit.id} className="align-items-start col-md-4 ">
				<Card className="single-post habit-card mt-5">
					{habit.title}
					<Button
						className="btn-danger delete-habit"
						onClick={() => {
							handleDelete(habit);
						}}
					>
						Delete Habit
					</Button>
					<Button
						className="danger delete-habit"
						onClick={() => {
							makeActive(habit);
						}}
					>
						Add Habit
					</Button>
				</Card>
			</Col>
		</>
	);
}

export default BankedHabits;
