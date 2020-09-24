import React from 'react';
import { ListGroup } from 'react-bootstrap';

function TodoList(props) {
  return (
    <ListGroup>
      {props.list.map(item => (
        <ListGroup.Item
          action
          variant={item.complete ? 'success' : 'danger'}
          key={item._id}
        >
          <span onClick={() => props.handleComplete(item._id)}>
            {item.text}
          </span>
          <span onClick={() => props.handleDelete(item._id)}>X</span>
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
}

export default TodoList;
