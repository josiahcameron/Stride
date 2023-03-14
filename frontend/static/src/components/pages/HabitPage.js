import { useState, useEffect } from "react";

import { Card, Form, Col, Row, Container, Button } from "react-bootstrap";

const INITIAL_HABITS = [
	{ title: "Brush Teeth", completed: "false" },
	{ title: "Exercise", completed: "false" },
	{ title: "Call mom", completed: "false" },
];

const INITIAL_QUOTE = [
	{
		text: "The way I see it, if you want the rainbows, you gotta put up with the rain",
		author: "Dolly Parton",
	},
];

function HabitPage() {
	const [habits, setHabits] = useState(INITIAL_HABITS);
	const [habitsCompleted, setHabitsCompleted] = useState(0);
	const [habitCompletion, setHabitCompletion] = useState(false);
	const [quote, setQuote] = useState(INITIAL_QUOTE);
	const denominator = habits.length;

	const habitHTML = habits.map((habit) => (
		<Row key={habit.id} className="align-items-start">
			<Col className="">
				<div className="post-container">
					<Card className="bg-dark text-white single-post h-100 w-80 mt-5">
						{/* <Card.Img src={article.image} alt="post-image" /> */}
						{/* <Card.ImgOverlay> */}
						<Card.Text>{habit.title}</Card.Text>
						<Card.Text>{habit.type}</Card.Text>
						<Form.Check
							type="checkbox"
							label="Completed"
							className="form-control "
							name="is_complete"
							value="true"
						/>
						{/* <div className="post-info flexbox">

						</div>
					</Card.ImgOverlay> */}
					</Card>
				</div>
			</Col>
		</Row>
	));

	return (
		<div className="habit-page wrapper">
			<div className="box progress-qotd">
				<section className="progress-QOTD">
					<div className="progress-container">
						<div className="progress-bar-wrap">
							<div className="progress-bar">
								<div className="mask half">
									<div className="fill"></div>
								</div>
							</div>
							<div className="inside-circle"> 75% </div>
						</div>
					</div>
					<div className="qotd-container">
						<div className="qotd">
							<p className="quote">{quote[0].text}</p>
							<p className="quote-author">- {quote[0].author}</p>
						</div>
					</div>
				</section>
			</div>
			<div className="box habit-list">
				<Container className="m-0 p-0">
					<section className="habits">{habitHTML}</section>
				</Container>
			</div>
		</div>
	);
}

export default HabitPage;
