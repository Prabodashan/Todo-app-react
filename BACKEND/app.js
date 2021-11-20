const express = require("express");
const app = express();
const PORT = 3300;
require("./helpers/mongodb_int");
const todoRoutes = require("./routes/todos");

const cors = require("cors");

//common middlewares
app.use(cors());
app.use(express.json());

//Basic route
app.get("/", (req, res) => {
  res.send("Welcome to the server!");
});

//Todo routes middleware
app.use("/api/todos", todoRoutes);

app.get("/prob/", (req, res) => {
  res.send("<button>prob</button>");
});

//Middleware for undefined routes
app.use((req, res) => {
  res.status(404).json({ error: { massage: "Not found!" } });
});

//Bind and Listen the connection
app.listen(PORT, () => {
  console.log(`Server running at port ${PORT}`);
});
