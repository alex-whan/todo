import React, { useState, useContext } from 'react';
import { ListGroup } from 'react-bootstrap';
import Badge from 'react-bootstrap/Badge';
import Toast from 'react-bootstrap/Toast';
import Pagination from 'react-bootstrap/Pagination';

import { SettingsContext } from './context/settings';

const TodoList = props => {
  const settings = useContext(SettingsContext);
  console.log('SETTINGS????', settings);
  const [page, setPage] = useState(0);

  // Pagination setup
  const list = props.list.filter(item =>
    settings.showCompleted ? true : !item.complete
  );
  const start = settings.maxVisible * page || 0;
  const end = start + settings.maxVisible || list.length;
  const pages = new Array(Math.ceil(list.length / settings.maxVisible)).fill(
    ''
  );

  const displayList = list ? list.slice(start, end) : [];

  const styles = {
    pill: {
      marginRight: '1rem',
      cursor: 'pointer',
    },
    difficulty: {
      display: 'block',
      textAlign: 'right',
    },
    toast: {
      maxWidth: '100%',
      width: '100%',
    },
  };

  return (
    <>
      {displayList.map(item => (
        <Toast
          key={item._id}
          style={styles.toast}
          onClose={() => props.handleDelete(item._id)}
        >
          <Toast.Header closeButton>
            <Badge
              pill
              style={styles.pill}
              variant={item.complete ? 'success' : 'danger'}
              onClick={() => props.handleComplete(item._id)}
            >
              {item.complete ? 'Complete' : 'Pending'}
            </Badge>
            <strong className="mr-auto">{item.assignee}</strong>
          </Toast.Header>
          <Toast.Body>
            {item.text}

            <small style={styles.difficulty}>
              Difficulty: {item.difficulty}
            </small>
          </Toast.Body>
        </Toast>
      ))}

      <Pagination>
        {pages.map((n, i) => (
          <Pagination.Item key={i + 1} onClick={() => setPage(i)}>
            {i + 1}
          </Pagination.Item>
        ))}
      </Pagination>
    </>
  );
};

export default TodoList;
