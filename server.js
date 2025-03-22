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
