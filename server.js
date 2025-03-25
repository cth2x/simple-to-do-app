// Imports
const express = require('express');
const path = require('path');

// Creating app instance
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, '.')));

// Routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

let todos = [];

// POST
app.post('/todos', (req, res) => {
  const task = req.body;
  todos.push(task);
  res.status(201).send(task);
});

// PUT
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

// GET all tasks
app.get('/todos', (req, res) => {
  res.status(200).send(todos);
});

// GET one task
app.get('/todos/:id', (req, res) => {
  const foundIndex = todos.findIndex(
    (task) => task.id.toString() === req.params.id.toString()
  );
  if (foundIndex !== -1) {
    res.status(200).send(todos[foundIndex]);
  } else {
    res.status(404).send('Task not found');
  }
});

// DELETE
app.delete('/todos/:id', (req, res) => {
  const foundIndex = todos.findIndex(
    (task) => task.id.toString() === req.params.id.toString()
  );
  if (foundIndex !== -1) {
    const deletedTask = todos[foundIndex];
    todos.splice(foundIndex, 1);
    res.status(200).send({ message: 'Task deleted', task: deletedTask });
  } else {
    res.status(404).send('Task not found');
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
