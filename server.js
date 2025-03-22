// Imports
const express = require('express');

// Creating app instance
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.send('Hello world');
});

let todos = [];

app.post('/todos', (req, res) => {
  const task = req.body;
  todos.push(task);
  res.status(201).send(task);
});

app.put('/todos/:id', (req, res) => {
  const foundIndex = todos.findIndex(
    (task) => task.id.toString() === req.params.id.toString()
  );
  if (foundIndex !== -1) {
    todos[foundIndex] = req.body;
    res.status(200).send(todos[foundIndex]);
  } else {
    res.status(404).send('Task not found');
  }
});
