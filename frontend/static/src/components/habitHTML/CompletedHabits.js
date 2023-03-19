import { Button, Form, Card, Col, Row } from "react-bootstrap";
function CompletedHabits({ handleDelete, habit, incompleteHabit, makeActive }) {
	return (
		<>
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
				</Button>{" "}
			</Col>
		</>
	);
}

export default CompletedHabits;
