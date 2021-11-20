import { Button, Container, Row, Col, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Todoinput from "./components/Todoinput";
import Todocard from "./components/Todocard";
import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  // Modal state
  const [modal, setModal] = useState(false);

  //Todo State
  const [todos, setTodos] = useState([]);

  //clicked todo state
  const [clickedTodo, setClickedTodo] = useState("");

  //Modal toggle funtion
  const modalShowHide = () => {
    setModal(!modal);
    if (clickedTodo) {
      selectClickedTodo("");
    }
  };

  //Clicked todo funtion
  const selectClickedTodo = (id) => {
    setClickedTodo(id);
  };

  //todos frtching funtion
  const todosFetchHandler = async () => {
    try {
      const { data } = await axios.get(`http://localhost:3300/api/todos/`);
      setTodos(data);
    } catch (err) {
      alert(err.message);
    }
  };

  const todosDeleteHandler = async (todoId) => {
    if (window.confirm("Are you really want to delete this Todo?")) {
      try {
        const { data } = await axios.delete(
          `http://localhost:3300/api/todos/${todoId}`
        );
        if (data.created) {
          alert(data.success.message);
          todosFetchHandler();
        } else {
          throw Error(data.errors.message);
        }
      } catch (err) {
        alert(err.message);
      }
    }
  };

  const searchTodoHandler = async (keyword) => {
    if (keyword === "") {
      todosFetchHandler();
    } else {
      try {
        const { data } = await axios.get(
          `http://localhost:3300/api/todos/search/${keyword}`
        );
        if (data) {
          setTodos(data);
          console.log(data);
        } else {
          throw Error(data.errors.message);
        }
      } catch (err) {
        alert(err.message);
      }
    }
  };

  useEffect(() => {
    todosFetchHandler();
  }, []);

  return (
    <>
      <Container className="p-4 bg-warning">
        <Row>
          <Col className="text-start">
            <h3 className="fw-bold">My Todo App</h3>
          </Col>
          <Col className="text-center">
            <Form className="d-flex">
              <Form.Control
                type="search"
                placeholder="Search"
                onChange={(e) => searchTodoHandler(e.target.value)}
              />
            </Form>
          </Col>
          <Col className="text-end">
            <Button onClick={modalShowHide} variant="primary">
              Add New Todo
            </Button>
          </Col>
        </Row>
      </Container>
      <Container className="p-4 mt-4 bg-light">
        <Row xs={1} md={2} lg={4} className="g-4">
          {todos.length > 0 ? (
            todos.map((obj) => {
              const { _id, title, description } = obj;
              return (
                <Todocard
                  key={_id}
                  todoId={_id}
                  todoTitle={title}
                  todoDescription={description}
                  todoClick={selectClickedTodo}
                  todoDelete={todosDeleteHandler}
                  togleModal={modalShowHide}
                />
              );
            })
          ) : (
            <h4 className="fw-bold">There is no any todos available</h4>
          )}
        </Row>
      </Container>
      {modal && (
        <Todoinput
          togleModal={modalShowHide}
          modalVal={modal}
          todoId={clickedTodo}
          todosFetch={todosFetchHandler}
        />
      )}
    </>
  );
}

export default App;
