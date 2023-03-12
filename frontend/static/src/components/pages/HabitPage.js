import { useState, useEffect } from "react";

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

	console.log(quote[0].text);
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
		</div>
	);
}

export default HabitPage;
