const express = require("express");
const router = express.Router();
const { getAllTodos } = require("../controllers/todoCon");

//Get all todos
router.get("/", getAllTodos);

module.exports = router;
