import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import useForm from './hooks/formHook';

function TodoForm(props) {
  // const [item, setItem] = useState({});
  // const [handleSubmit, handleChange] = useForm(submitForm);

  // const handleInputChange = e => {
  //   setItem({ ...item, [e.target.name]: e.target.value });
  // };

  // const handleSubmit = e => {
  //   e.preventDefault();
  //   e.target.reset();
  //   props.handleSubmit(item);
  //   setItem({});
  // };

  const submitForm = task => {
    props.handleSubmit(task);
    console.log('TASK???', task);
  };

  const [handleSubmit, handleChange] = useForm(submitForm);

  return (
    <Card>
      <Card.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formToDoItem">
            <Form.Label>To Do Item</Form.Label>
            <Form.Control
              type="text"
              name="text"
              placeholder="Item Details"
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="formAssignee">
            <Form.Label>Assigned To</Form.Label>
            <Form.Control
              type="text"
              name="assignee"
              placeholder="Assignee Name"
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="formDifficulty">
            <Form.Label>Difficulty</Form.Label>
            <Form.Control
              type="range"
              name="difficulty"
              min={0}
              max={10}
              onChange={handleChange}
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
}

export default TodoForm;
