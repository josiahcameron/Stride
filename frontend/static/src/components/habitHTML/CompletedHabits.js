import { Button, Form, Card, Col, Row } from "react-bootstrap";
function CompletedHabits({ handleDelete, habit, incompleteHabit, makeActive }) {
	return (
		<>
			<div key={habit.id} className="habit-cards col-md-8">
				<Card className="single-post habit-card mt-3">
					<Form.Check
						checked
						type="checkbox"
						className="habit-checkbox border-0"
						label={habit.title}
						onClick={() => {
							incompleteHabit(habit);
						}}
					/>
				</Card>
			</div>
		</>
	);
}

export default CompletedHabits;
