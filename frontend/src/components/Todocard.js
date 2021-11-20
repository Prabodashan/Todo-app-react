import React from "react";
import { Button, Col, Card, Stack } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

function Todocard({
  todoId,
  todoTitle,
  todoDescription,
  todoClick,
  todoDelete,
  togleModal,
}) {
  return (
    <>
      <Col>
        <Card>
          <Card.Body>
            <Card.Title>{todoTitle}</Card.Title>
            <Card.Text>{todoDescription}</Card.Text>
            <Stack direction="horizontal" gap={2}>
              <Button
                onClick={() => {
                  togleModal();
                  todoClick(todoId);
                }}
                className="w-100"
                variant="success"
              >
                Edit
              </Button>
              <Button
                onClick={() => {
                  console.log("deleted");
                  todoDelete(todoId);
                }}
                className="w-100"
                variant="danger"
              >
                Delete
              </Button>
            </Stack>
          </Card.Body>
        </Card>
      </Col>
    </>
  );
}

export default Todocard;
