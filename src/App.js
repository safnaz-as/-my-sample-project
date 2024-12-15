import React, { useState } from "react";

function App() {
  const [task, setTask] = useState(""); // State to store new task input
  const [tasks, setTasks] = useState([]); // State to store the list of tasks

  // Handle input change and update task state
  const handleInputChange = (e) => {
    setTask(e.target.value);
  };

  // Add a new task to the task list
  const addTask = () => {
    if (task) {
      setTasks([...tasks, { text: task, completed: false }]);
      setTask(""); // Reset input field
    }
  };

  // Toggle task completion (strikethrough)
  const toggleTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].completed = !updatedTasks[index].completed;
    setTasks(updatedTasks);
  };

  // Remove a task from the list
  const removeTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  return (
    <div className="App">
      <h1>Todo List</h1>

      {/* Input field to add new task */}
      <input
        type="text"
        value={task}
        onChange={handleInputChange}
        placeholder="Add a new task"
      />
      <button onClick={addTask}>Add Task</button>

      {/* List of tasks */}
      <ul>
        {tasks.map((task, index) => (
          <li key={index} style={{ marginBottom: "10px" }}>
            {/* Task with strikethrough if completed */}
            <span
              style={{
                textDecoration: task.completed ? "line-through" : "none",
                cursor: "pointer",
              }}
              onClick={() => toggleTask(index)}
            >
              {task.text}
            </span>
            {/* Delete button */}
            <button
              style={{
                marginLeft: "10px",
                backgroundColor: "red",
                color: "white",
                border: "none",
                cursor: "pointer",
              }}
              onClick={() => removeTask(index)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
