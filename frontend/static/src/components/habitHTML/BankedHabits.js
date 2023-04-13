import {
	Button,
	Card,
	Col,
	Row,
	OverlayTrigger,
	Tooltip,
} from "react-bootstrap";

import { GoDiffAdded } from "react-icons/go";
import { BsFillTrashFill } from "react-icons/bs";

function BankedHabits({ handleDelete, habit, makeActive }) {
	return (
		<div key={habit.id} className="habit-cards col-md-8">
			<Card className="single-post habit-card mt-3">
				{habit.title}
				<div className="banked-habit-button">
					<OverlayTrigger
						placement="top"
						overlay={<Tooltip>Add to Today's Goals</Tooltip>}
					>
						<Button
							className="activate-habit"
							onClick={() => {
								makeActive(habit);
							}}
						>
							<GoDiffAdded />
						</Button>
					</OverlayTrigger>
					<OverlayTrigger
						placement="top"
						overlay={<Tooltip>Trash Goal</Tooltip>}
					>
						<Button
							className="btn-danger delete-habit"
							onClick={() => {
								handleDelete(habit);
							}}
						>
							<BsFillTrashFill />
						</Button>
					</OverlayTrigger>
				</div>
			</Card>
		</div>
	);
}

export default BankedHabits;
