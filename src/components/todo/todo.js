import React, { useEffect, useState, useCallback } from 'react';

import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import './todo.scss';

import TodoForm from './form.js';
import TodoList from './list.js';

import useAjax from './hooks/ajax';

// const apiURL = process.env.REACT_APP_API;
// const apiURL = 'https://api-js401.herokuapp.com';
const apiURL = 'http://localhost:3001';

function ToDo() {
  const { request, response } = useAjax();
  const [list, setList] = useState([]);

  const addItem = async item => {
    const options = {
      method: 'post',
      url: `${apiURL}/api/v1/todos`,
      data: item,
    };
    request(options); // imported from useAjax hook
  };

  const toggleComplete = async id => {
    const item = list.filter(i => i._id === id)[0] || {};

    if (item._id) {
      const options = {
        method: 'put',
        url: `${apiURL}/api/v1/todos/${id}`,
        data: { complete: !item.complete },
      };
      request(options);
    }
  };

  const deleteItem = async id => {
    const options = {
      method: 'delete',
      url: `${apiURL}/api/v1/todos/${id}`,
    };
    request(options);
  };

  const getToDoList = useCallback(async () => {
    const options = {
      method: 'get',
      url: `${apiURL}/api/v1/todos`,
    };
    request(options);
  }, [request]);

  // This runs every time the "response" object changes - can redraw or re-fetch the list depending on new data
  useEffect(() => {
    if (response.results) {
      response.results && setList(response.results);
    } else {
      getToDoList();
    }
  }, [response, getToDoList, setList]);

  useEffect(() => {
    let incompleteListLength = list.filter(item => !item.complete).length;
    document.title = `To Do List: ${incompleteListLength}`;
  }, [list]); // can we get rid of the [list]?

  // Runs on app load/mounting
  useEffect(() => {
    getToDoList();
  }, [getToDoList]);

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
              <TodoList
                list={list}
                handleComplete={toggleComplete}
                handleDelete={deleteItem}
              />
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default ToDo;
