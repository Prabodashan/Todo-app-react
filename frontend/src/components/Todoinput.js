import { Button, Modal, Form, Alert } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from "react";
import axios from "axios";

const Todoinput = ({ togleModal, modalVal, todoId, todosFetch }) => {
  //New todo states
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  //Error state
  const [error, setError] = useState("");

  //Success state
  const [success, setSuccess] = useState("");

  const titleState = (newVal) => {
    console.log(newVal);
    setTitle(newVal);
  };

  const descState = (newVal) => {
    console.log(newVal);
    setDescription(newVal);
  };

  const createTodoHandler = async () => {
    try {
      const { data } = await axios.post(`http://localhost:3300/api/todos/`, {
        title,
        description,
      });
      if (data.created) {
        setError("");
        setSuccess(data.success.message);
        setTimeout(() => {
          togleModal();
        }, 2000);
        todosFetch();
      } else {
        throw Error(data.errors.message);
      }
    } catch (err) {
      setSuccess("");
      setError(err.message);
    }
  };

  // Get one todo funtion
  const getOneTodoHandler = async (todoId) => {
    try {
      const { data } = await axios.get(
        `http://localhost:3300/api/todos/${todoId}`
      );
      setTitle(data.title);
      setDescription(data.description);
    } catch (err) {
      setSuccess("");
      setError(err.message);
    }
  };

  useEffect(() => {
    if (todoId) {
      getOneTodoHandler(todoId);
    }
  }, [todoId]);

  //Update Todo Function
  const updateTodoHandler = async () => {
    try {
      const { data } = await axios.put(
        `http://localhost:3300/api/todos/${todoId}`,
        {
          title,
          description,
        }
      );
      if (data.created) {
        setError("");
        setSuccess(data.success.message);
        setTimeout(() => {
          togleModal();
        }, 2000);
        todosFetch();
      } else {
        throw Error(data.errors.message);
      }
    } catch (err) {
      setSuccess("");
      setError(err.message);
    }
  };

  return (
    <>
      <Modal show={modalVal} onHide={togleModal}>
        <Modal.Header closeButton>
          <Modal.Title>{!todoId ? "Add Todo" : "Update Todo"}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Todo Title</Form.Label>
              <Form.Control
                value={title}
                type="text"
                placeholder="Enter Title"
                onChange={(e) => titleState(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Todo Description</Form.Label>
              <Form.Control
                value={description}
                as="textarea"
                rows={3}
                placeholder="Enter Description"
                onChange={(e) => descState(e.target.value)}
              />
            </Form.Group>
          </Form>
          {error && (
            <Alert variant="danger">
              <p>{error}</p>
            </Alert>
          )}
          {success && (
            <Alert variant="success">
              <p>{success}</p>
            </Alert>
          )}
        </Modal.Body>

        <Modal.Footer>
          <Button onClick={togleModal} variant="secondary">
            Close
          </Button>
          <Button
            onClick={!todoId ? createTodoHandler : updateTodoHandler}
            variant="primary"
          >
            {!todoId ? "Add Todo" : "Update Todo"}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Todoinput;
