import React, { useState, useEffect } from 'react';
import TodoForm from './form.js';
import TodoList from './list.js';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './todo.scss';
import axios from 'axios';
import useAjax from './hooks/ajax';

const apiURL = 'http://localhost:3001/api/v1/todos';

function ToDo(props) {
  // const { list, setList, isLoading, setIsLoading } = useAjax(apiURL);
  const { list, setList } = useAjax(apiURL);

  // const [list, setList] = useState([]);

  // Check out "warning" about calling an async function directly inside of a useEffect
  useEffect(async () => {
    const response = await axios.get(apiURL); // could pull this to a .env later - just get it working and go from there
    setList(response.data.results);
  }, []);

  // Like componentDidMount
  // get it to work here and THEN go to Custom Hooks
  // Also, use the "useForm" custom hook and "useAJAX" hook
  // The DEMO shows "everything you need for the lab plus a few other extra features"
  // Need to require AXIOS and CORS
  // Pending/Complete items in Bootstrap is probably called a "pill"

  useEffect(() => {
    let listLength = list.filter(item => !item.complete).length;
    document.title = `To Do List: ${listLength}`;
  }, [list]);

  const addItem = async item => {
    item._id = Math.random();
    item.complete = false;
    setList([...list, item]);

    const req = {
      id: item._id,
      text: item.text,
      assignee: item.assignee,
      difficulty: item.difficulty,
      complete: item.complete,
    };

    await axios.post(apiURL, req);
  };

  const toggleComplete = async id => {
    let item = list.filter(i => i._id === id)[0] || {};

    if (item._id) {
      item.complete = !item.complete;

      let url = `${apiURL}/${id}`;

      const req = {
        id: item._id,
        complete: item.complete,
      };

      await axios.patch(url, req);

      let checkList = list.map(listItem =>
        listItem._id === item._id ? item : listItem
      );

      setList(checkList);
    }
  };

  const deleteItem = async id => {
    let item = list.filter(i => i._id === id)[0] || {};
    let url = `${apiURL}/${id}`;

    // const req = {
    //   id: item._id,
    // };

    // How can I get this to refresh on delete? useEffect?

    await axios.delete(url);
    // console.log('ITEM TO DELETE:', url, req);

    // let checkList = list.map(listItem =>
    //   listItem._id === item._id ? item : listItem
    // );

    // setList(checkList);
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
