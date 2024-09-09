'use client';
import React from 'react';
import { useState, useEffect } from 'react';

interface Task {
    id: number;
    text: string;
}

function ToDoList(): React.JSX.Element {
    
    let btnStyle: string = 'bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full';
    
    const [tasks, setTasks] = useState<Task[]>(() => {
      try {
        const storedTasks = localStorage.getItem('tasks');
        return storedTasks ? JSON.parse(storedTasks) : [];
      } catch(error: any){
        console.error(error.message); 
      }

    });
    const [taskText, setTaskText] = useState('');

    useEffect(() => {
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks]);

    const addTask = () => {
      if (taskText.trim() === '') return;
      const newTask = { id: Date.now(), text: taskText };
      setTasks([...tasks, newTask]);
      setTaskText('');
    };

    const removeTask = (id: number) => {
      const updatedTasks = tasks.filter((task) => task.id !== id);
      setTasks(updatedTasks);
    };

    return (
      <div>
          <div>
            <h1>To-Do List</h1>
            <input
              type="text"
              value={taskText}
              onChange={(e) => setTaskText(e.target.value)}
              placeholder="Add a new task"
            />
            <button onClick={addTask} className="add-button">
              Add Task
            </button>
          </div>
          <div>
            <h2>Task List</h2>
            <ul>
              {tasks.map(task => (
                <li key={task.id}>
                  {task.text}
                  <button onClick={() => removeTask(task.id)} className={btnStyle}>
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          </div>
      </div>
      );
    };

export default ToDoList;