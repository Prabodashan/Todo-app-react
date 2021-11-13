const Todo = require("../models/Todo");

//Get all todos
exports.getAllTodos = async (req, res) => {
  try {
    const todos = await Todo.find();
    res.status(200).json(todos);
  } catch (err) {
    res.json({ errors: { massage: err.message } });
  }
};
