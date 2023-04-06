import React, { useState } from "react";
import {
	Container,
	Row,
	Col,
	Button,
	Form,
	FormGroup,
	ListGroup,
	ListGroupItem,
} from "react-bootstrap";

const Journal = () => {
	const [entries, setEntries] = useState([
		{ id: 1, title: "Entry 1", content: "This is the content of entry 1." },
		{ id: 2, title: "Entry 2", content: "This is the content of entry 2." },
		{ id: 3, title: "Entry 3", content: "This is the content of entry 3." },
	]);
	const [newTitle, setNewTitle] = useState("");
	const [newContent, setNewContent] = useState("");
	const [selectedEntry, setSelectedEntry] = useState(null);

	const handleAddEntry = () => {
		const newEntry = {
			id: entries.length + 1,
			title: newTitle,
			content: newContent,
		};
		setEntries([...entries, newEntry]);
		setNewTitle("");
		setNewContent("");
	};

	const handleSelectEntry = (entry) => {
		setSelectedEntry(entry);
	};

	return (
		<Container>
			<Row>
				<Col md={6}>
					<h2>Select Previous Entries</h2>
					<ListGroup>
						{entries.map((entry) => (
							<ListGroupItem
								key={entry.id}
								onClick={() => handleSelectEntry(entry)}
							>
								{entry.title}
							</ListGroupItem>
						))}
					</ListGroup>
				</Col>
				<Col md={6}>
					<h2>Add New Entry</h2>
					<Form>
						<FormGroup>
							<Form.Label for="title">Title</Form.Label>
							<Form.Control
								type="text"
								name="title"
								id="title"
								value={newTitle}
								onChange={(e) => setNewTitle(e.target.value)}
							/>
						</FormGroup>
						<FormGroup>
							<Form.Label for="content">Content</Form.Label>
							<Form.Control
								type="textarea"
								name="content"
								id="content"
								value={newContent}
								onChange={(e) => setNewContent(e.target.value)}
							/>
						</FormGroup>
						<Button color="primary" onClick={handleAddEntry}>
							Add Entry
						</Button>
					</Form>
				</Col>
			</Row>
			<Row>
				{selectedEntry && (
					<Col>
						<h2>{selectedEntry.title}</h2>
						<p>{selectedEntry.content}</p>
					</Col>
				)}
			</Row>
		</Container>
	);
};

export default Journal;
