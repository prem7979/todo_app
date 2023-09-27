import React, { useState, useEffect } from "react";

export default function Todo() {
  // State variables to manage tasks and the input field value
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);

  // UseEffect to load tasks from local storage when the component mounts
  useEffect(() => {
    if (localStorage.getItem("localTasks")) {
      const storedList = JSON.parse(localStorage.getItem("localTasks"));
      setTasks(storedList);
    }
  }, []);

  // Function to add a new task to the list
  const addTask = () => {
    if (task) {
      // Create a new task object with a unique ID, title, and initial completion status
      const newTask = {
        id: new Date().getTime().toString(),
        title: task,
        completed: false,
      };
      // Update the tasks state with the new task and save it to local storage
      setTasks([...tasks, newTask]);
      localStorage.setItem("localTasks", JSON.stringify([...tasks, newTask]));
      // Clear the input field
      setTask("");
    }
  };

  // Function to handle marking a task as completed or undone
  const handleDelete = (taskId) => {
    // Map over the tasks to update the completion status of the selected task
    const updatedTasks = tasks.map((t) => {
      if (t.id === taskId) {
        return { ...t, completed: !t.completed };
      }
      return t;
    });

    // Sort the tasks to display completed tasks at the bottom
    updatedTasks.sort((a, b) => {
      if (a.completed === b.completed) {
        return a.id - b.id;
      }
      return a.completed ? 1 : -1;
    });

    // Update the tasks state and save it to local storage
    setTasks(updatedTasks);
    localStorage.setItem("localTasks", JSON.stringify(updatedTasks));
  };

  // Function to clear all tasks and remove them from local storage
  const handleClearAll = () => {
    setTasks([]);
    localStorage.removeItem("localTasks");
  };

  // Function to handle key press events (e.g., Enter key to add a task)
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      addTask();
    }
  };

  return (
    <div className="container mt-4" style={{ minHeight: "80vh" }}>
      {/* Title */}
      <h1 className="text-center text-primary">To-Do App</h1>
      <div className="row">
        {/* Input field for adding tasks */}
        <div className="col-8">
          <input
            name="task"
            type="text"
            value={task}
            placeholder="Write your task"
            className="form-control"
            onChange={(e) => setTask(e.target.value)}
            onKeyPress={handleKeyPress}
          />
        </div>
        {/* Add button */}
        <div className="col-4">
          <button className="btn btn-primary form-control" onClick={addTask}>
            Add
          </button>
        </div>
      </div>
      {/* Badge displaying the number of tasks */}
      <div className="badge mt-2">
        You have
        {!tasks.length
          ? " no tasks"
          : tasks.length === 1
          ? " 1 task"
          : tasks.length > 1
          ? ` ${tasks.length} tasks`
          : null}
      </div>
      {/* Render active tasks */}
      {tasks.map((task) => {
        if (!task.completed) {
          return (
            <div className="row mt-2" key={task.id}>
              <div className="col-10">
                <div
                  className={`form-control ${
                    task.completed ? "bg-light text-muted" : "bg-white"
                  }`}
                  style={{ textAlign: "left", fontWeight: "bold" }}
                >
                  {task.title}
                </div>
              </div>
              {/* Button to mark task as completed or undone */}
              <div className="col-2">
                <button
                  className={`btn ${
                    task.completed ? "btn-warning" : "btn-success"
                  }`}
                  onClick={() => handleDelete(task.id)}
                >
                  {task.completed ? "Undo" : "Done"}
                </button>
              </div>
            </div>
          );
        }
      })}
      {/* Render completed tasks */}
      {tasks.map((task) => {
        if (task.completed) {
          return (
            <div className="row mt-2" key={task.id}>
              <div className="col-10">
                <div
                  className={`form-control ${
                    task.completed ? "bg-light text-muted" : "bg-white"
                  }`}
                  style={{ textAlign: "left", fontWeight: "bold" }}
                >
                  {task.title}
                </div>
              </div>
              {/* Button to mark task as completed or undone */}
              <div className="col-2">
                <button
                  className={`btn ${
                    task.completed ? "btn-warning" : "btn-success"
                  }`}
                  onClick={() => handleDelete(task.id)}
                >
                  {task.completed ? "Undo" : "Done"}
                </button>
              </div>
            </div>
          );
        }
      })}
      {/* Button to clear all tasks */}
      {!tasks.length ? null : (
        <div className="text-center my-4">
          <button className="btn btn-secondary" onClick={handleClearAll}>
            Clear All
          </button>
        </div>
      )}
    </div>
  );
}
