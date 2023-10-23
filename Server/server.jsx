const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 5000;

app.use(bodyParser.json());

let tasks = [];

// Define a wildcard route to handle both '/' and '/api/tasks'
app.all(['/', '/api/tasks'], (req, res) => {
  if (req.method === 'GET') {
    // Handle GET request (e.g., return tasks)
    res.json(tasks);
  } else if (req.method === 'POST') {
    // Handle POST request (e.g., add a new task)
    const newTask = req.body;
    tasks.push(newTask);
    res.status(201).send();
  } else {
    // Handle other HTTP methods as needed
    res.status(405).send('Method Not Allowed');
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
