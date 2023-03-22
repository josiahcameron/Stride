import { Button, Form, Card, Col, Row } from "react-bootstrap";
function CompletedHabits({ handleDelete, habit, incompleteHabit, makeActive }) {
	return (
		<>
			<Row key={habit.id} className=" align-items-start ">
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
			</Row>
		</>
	);
}

export default CompletedHabits;
