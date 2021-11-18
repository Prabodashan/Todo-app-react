const express = require("express");
const router = express.Router();
const {
  getAllTodos,
  addNewTodo,
  getTodoById,
  updateTodo,
  deleteTodo,
  getTodosBySearch,
} = require("../controllers/todoCon");

//Get all todos
router.get("/", getAllTodos);

// Add new todo
router.post("/", addNewTodo);

//Get todo by id
router.get("/:todoId", getTodoById);

//Update Todo by id
router.put("/:todoId", updateTodo);

//Delete Todo by id
router.delete("/:todoId", deleteTodo);

//Get todo by search
router.get("/search/:query", getTodosBySearch);

module.exports = router;
