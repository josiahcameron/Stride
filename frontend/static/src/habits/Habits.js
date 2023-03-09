import axios from "axios";

import { useState, useEffect } from "react";

import Cookies from "js-cookie";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import { Col } from "react-bootstrap";

function Habits({ habits, habit }) {
	return (
		<Col key={habit.id}>
			<div className="post-container">
				<Card className="bg-dark text-white single-post h-100 w-80 mt-5">
					{/* <Card.Img src={article.image} alt="post-image" /> */}
					{/* <Card.ImgOverlay> */}
					<Card.Text>{habit.title}</Card.Text>

					{/* <div className="post-info flexbox">

						</div>
					</Card.ImgOverlay> */}
				</Card>
			</div>
		</Col>
	);
}

export default Habits;
