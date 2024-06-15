// src/TodoList.js
import React, { useState, useEffect } from 'react';
import './TodoList.css';

const TodoList = () => {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('tasks');
    return savedTasks ? JSON.parse(savedTasks) : [];
  });
  const [inputValue, setInputValue] = useState('');
  const [filter, setFilter] = useState('all');
  const [sortOrder, setSortOrder] = useState('asc');

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (inputValue.trim()) {
      setTasks([...tasks, { text: inputValue, completed: false }]);
      setInputValue('');
    }
  };

  const removeTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  const toggleTaskCompletion = (index) => {
    setTasks(
      tasks.map((task, i) =>
        i === index ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const sortedTasks = [...tasks].sort((a, b) => {
    if (sortOrder === 'asc') {
      return a.text.localeCompare(b.text);
    } else {
      return b.text.localeCompare(a.text);
    }
  });

  const filteredTasks = sortedTasks.filter(task => {
    if (filter === 'all') return true;
    if (filter === 'completed') return task.completed;
    if (filter === 'active') return !task.completed;
  });

  return (
    <div className="todo-container">
      <h1 className="title">To-Do List</h1>
      <div className="input-container">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Add a new task"
        />
        <button onClick={addTask} className="add-button">Add Task</button>
      </div>
      <div className="filter-sort-container">
        <div className="filter-buttons">
          <button onClick={() => setFilter('all')}>All</button>
          <button onClick={() => setFilter('completed')}>Completed</button>
          <button onClick={() => setFilter('active')}>Active</button>
        </div>
        <div className="sort-buttons">
          <button onClick={() => setSortOrder('asc')}>Sort Asc</button>
          <button onClick={() => setSortOrder('desc')}>Sort Desc</button>
        </div>
      </div>
      <ul className="task-list">
        {filteredTasks.map((task, index) => (
          <li key={index} className="task-item">
            <span
              style={{ textDecoration: task.completed ? 'line-through' : 'none' }}
              className="task-text"
            >
              {task.text}
            </span>
            <button onClick={() => toggleTaskCompletion(index)} className="done-button">
              {task.completed ? 'Undo' : 'Done'}
            </button>
            <button onClick={() => removeTask(index)} className="remove-button">Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
