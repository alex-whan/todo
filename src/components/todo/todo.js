import React, { useState, useEffect } from 'react';
import TodoForm from './form.js';
import TodoList from './list.js';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import './todo.scss';

function ToDo(props) {
  const [list, setList] = useState([]);

  useEffect(() => {
    let defaultList = [
      {
        _id: 1,
        complete: false,
        text: 'Clean the Kitchen',
        difficulty: 3,
        assignee: 'Person A',
      },
      {
        _id: 2,
        complete: false,
        text: 'Do the Laundry',
        difficulty: 2,
        assignee: 'Person A',
      },
      {
        _id: 3,
        complete: false,
        text: 'Walk the Dog',
        difficulty: 4,
        assignee: 'Person B',
      },
      {
        _id: 4,
        complete: true,
        text: 'Do Homework',
        difficulty: 3,
        assignee: 'Person C',
      },
      {
        _id: 5,
        complete: false,
        text: 'Take a Nap',
        difficulty: 1,
        assignee: 'Person B',
      },
    ];

    setList(defaultList);
  }, []);

  useEffect(() => {
    let listLength = list.filter(item => !item.complete).length;
    document.title = `To Do List: ${listLength}`;
  }, [list]);

  const addItem = item => {
    item._id = Math.random();
    item.complete = false;
    setList([...list, item]);
  };

  const toggleComplete = id => {
    let item = list.filter(i => i._id === id)[0] || {};

    if (item._id) {
      item.complete = !item.complete;
      let checkList = list.map(listItem =>
        listItem._id === item._id ? item : listItem
      );
      setList(checkList);
    }
  };

  // It's common to put the entire "main" part of your site in a component called "container" (in 'Layout' section of docs)
  // These fit into a GRID SYSTEM (and Bootstrap even links to CSS-Tricks flexbox) - i.e. will use Rows and Columns
  // CONTAINERS are meant to be populated with ROWS, and ROWS are meant to be populated with COLUMNS

  return (
    <>
      <header>
        <Navbar bg="primary" variant="dark">
          <Nav className="mr-auto">
            <Nav.Link href="#home">Home</Nav.Link>
          </Nav>
        </Navbar>
      </header>

      <Container>
        <Row>
          <Col>
            {/* <section className="todo"> */}
            <Navbar bg="dark" variant="dark">
              <Nav className="mr-auto">
                <Navbar.Brand>
                  To Do List Manager (
                  {list.filter(item => !item.complete).length})
                </Navbar.Brand>
              </Nav>
            </Navbar>
          </Col>
        </Row>

        <Row>
          <Col md={4}>
            <div>
              <TodoForm handleSubmit={addItem} />
            </div>
          </Col>
          <Col md={8}>
            <div>
              <TodoList list={list} handleComplete={toggleComplete} />
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default ToDo;
