import React, { useState, useEffect } from 'react';

const TodoList = () => {
  const [tasks, setTasks] = useState([]);
  const [taskTitle, setTaskTitle] = useState('');
  const [loading, setLoading] = useState(true);

  // Fetch tasks from the backend when the component is mounted
  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await fetch('http://localhost:5000/tasks');
      const data = await response.json();
      setTasks(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const handleAddTask = async () => {
    if (taskTitle.trim() === '') return;

    try {
      const response = await fetch('http://localhost:5000/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: taskTitle,
          completed: false,
        }),
      });

      const newTask = await response.json();
      setTasks([...tasks, newTask.task]); // Add the new task to the list
      setTaskTitle(''); // Clear the input field
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  const handleCompleteTask = async (taskId) => {
    try {
      const response = await fetch(`http://localhost:5000/tasks/${taskId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          completed: true,
        }),
      });

      if (response.ok) {
        const updatedTasks = tasks.map((task) =>
          task._id === taskId ? { ...task, completed: true } : task
        );
        setTasks(updatedTasks);
      }
    } catch (error) {
      console.error('Error completing task:', error);
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      const response = await fetch(`http://localhost:5000/tasks/${taskId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setTasks(tasks.filter((task) => task._id !== taskId));
      }
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  return (
    <div>
      <h1>To-Do List</h1>

      {loading ? (
        <p>Loading tasks...</p>
      ) : (
        <ul>
          {tasks.map((task) => (
            <li key={task._id}>
              <span
                style={{
                  textDecoration: task.completed ? 'line-through' : 'none',
                }}
              >
                {task.title}
              </span>
              {!task.completed && (
                <button onClick={() => handleCompleteTask(task._id)}>
                  Complete
                </button>
              )}
              <button onClick={() => handleDeleteTask(task._id)}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}

      <input
        type="text"
        value={taskTitle}
        onChange={(e) => setTaskTitle(e.target.value)}
        placeholder="Add a new task"
      />
      <button onClick={handleAddTask}>Add Task</button>
    </div>
  );
};

export default TodoList;
