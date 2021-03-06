import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import useForm from './hooks/formHook';

function TodoForm(props) {
  const { handleSubmit, handleInputChange } = useForm(props.handleSubmit);

  return (
    <Form onSubmit={handleSubmit}>
      <Card>
        <Card.Body>
          <Form.Group controlId="formToDoItem">
            <Form.Label>To Do Item</Form.Label>
            <Form.Control
              type="text"
              name="text"
              placeholder="Item Details"
              onChange={handleInputChange}
            />
          </Form.Group>

          <Form.Group controlId="formAssignee">
            <Form.Label>Assigned To</Form.Label>
            <Form.Control
              type="text"
              name="assignee"
              placeholder="Assignee Name"
              onChange={handleInputChange}
            />
          </Form.Group>

          <Form.Group controlId="formDifficulty">
            <Form.Label>Difficulty</Form.Label>
            <Form.Control
              type="range"
              name="difficulty"
              defaultValue={5}
              min={0}
              max={10}
              onChange={handleInputChange}
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Card.Body>
      </Card>
    </Form>
  );
}

export default TodoForm;
