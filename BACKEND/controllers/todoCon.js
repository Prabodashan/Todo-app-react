const Todo = require("../models/Todo");
const { upload } = require("../helpers/imageup");

//Get all todos
exports.getAllTodos = async (req, res) => {
  try {
    const todos = await Todo.find();
    res.status(200).json(todos);
  } catch (err) {
    res.json({ errors: { message: err.message } });
  }
};

//Add new todo
exports.addNewTodo = async (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.json({ errors: { message: err.message } });
    } else {
      //Check if todo title
      if (req.file) {
        const { title, description } = req.body;
        const todoImage = req.file.filename;
        console.log(todoImage);

        // Check if todo title already exist
        const todoByTitle = await Todo.findOne({ title });

        if (todoByTitle) {
          return res.json({
            errors: { message: "Todo title already exist!!" },
          });
        }

        // Create new todo
        const newTodo = new Todo({
          title: title,
          description: description,
          todoImage: todoImage,
          creationDate: Date.now(),
        });
        try {
          await newTodo.save();
          res.status(200).json({
            created: true,
            success: { message: "Todo successful created!!" },
          });
        } catch (err) {
          res.json({
            errors: { message: Object.entries(err.errors)[0][1].message },
          });
        }
      } else {
        return res, json({ errors: { message: "select an image!" } });
      }
    }
  });
};

//Get todo By id

exports.getTodoById = async (req, res) => {
  const { todoId } = req.params;

  try {
    const todo = await Todo.findById(todoId);
    res.status(200).json(todo);
  } catch (err) {
    res.json({ errors: { message: Object.entries(err.errors)[0][1].message } });
  }
};

// Update todo
exports.updateTodo = async (req, res) => {
  const { todoId } = req.params;
  const { title, description } = req.body;

  //Check if todo totle already exist
  const todoByTitle = await Todo.findOne({ title });

  if (todoByTitle) {
    if (todoByTitle.id !== todoId) {
      return res.json({ errors: { message: "Todo title already exist!!" } });
    }
  }
  //Check if todo available according to the id
  const todoById = await Todo.findById(todoId);
  if (!todoById) {
    return res.json({ errors: { message: "Todo doesn't exist!!" } });
  }

  try {
    await Todo.findByIdAndUpdate(
      { _id: todoId },
      {
        title: title,
        description: description,
      },
      {
        new: true,
        runValidators: true,
      }
    );
    res.status(200).json({
      created: true,
      success: { message: "Todo successful updated!!" },
    });
  } catch (err) {
    res.json({ errors: { message: Object.entries(err.errors)[0][1].message } });
  }
};

//Delete todo
exports.deleteTodo = async (req, res) => {
  const { todoId } = req.params;
  console.log(todoId);
  const todoById = await Todo.findById(todoId);
  if (!todoById) {
    console.log("Todo doesn't exist!!");
    return res.json({ errors: { message: "Todo doesn't exist!!" } });
  }
  console.log("before try");
  try {
    await Todo.findByIdAndDelete(todoId);
    res.status(200).json({
      created: true,
      success: { message: "Todo successful deleted!!" },
    });
  } catch (err) {
    res.json({ errors: { message: Object.entries(err.errors)[0][1].message } });
  }
  console.log("after try");
};

//Get todos by Searching
exports.getTodosBySearch = async (req, res) => {
  const { query } = req.params;
  try {
    const regexQuery = new RegExp(query, "i");
    const todos = await Todo.find({
      $or: [{ title: regexQuery }, { description: regexQuery }],
    });
    res.status(200).json(todos);
  } catch (err) {
    res.json({ errors: { message: Object.entries(err.errors)[0][1].message } });
  }
};
