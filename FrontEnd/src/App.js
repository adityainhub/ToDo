import React, { useState, useEffect } from 'react';

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  useEffect(() => {
    fetch('/api/tasks')
      .then((res) => res.json())
      .then((data) => setTasks(data))
      .catch((err) => console.log(err));
  }, []);

  const handleAddTask = () => {
    fetch('/api/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ task: newTask, completed: false }),
    })
      .then(() => {
        setTasks([...tasks, { task: newTask, completed: false }]);
        setNewTask('');
      })
      .catch((err) => console.log(err));
  };

  const handleTaskCompletion = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].completed = !updatedTasks[index].completed;

    fetch('/api/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedTasks[index]),
    })
      .then(() => setTasks(updatedTasks))
      .catch((err) => console.log(err));
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center">To-Do List</h1>
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Add task..."
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <div className="input-group-append">
          <button
            className="btn btn-success"
            type="button"
            onClick={handleAddTask}
          >
            Add Task
          </button>
        </div>
      </div>
      <ul className="list-group">
        {tasks.map((task, index) => (
          <li key={index} className="list-group-item d-flex align-items-center">
            <input
              type="checkbox"
              className="mr-3"
              checked={task.completed}
              onChange={() => handleTaskCompletion(index)}
            />
            <span className={task.completed ? 'completed' : ''}>{task.task}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
