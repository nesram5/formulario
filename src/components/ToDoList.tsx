'use client';
import React from 'react';
import { useState } from 'react';
import FullList from './FullList';
import ListItem from './ListItem';

interface Task {
    id: number;
    text: string;
}

function ToDoList(): React.JSX.Element {
    const fullList = FullList.instance
    
    let btnStyle: string = 'bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full';

    const [tasks, setTasks] = useState<Task[]>([]);

    const [taskText, setTaskText] = useState('');

    const addTask = () => {
        if (taskText.trim() === '') return;
        let id = Date.now();
        const newItem = new ListItem(id.toString(), taskText)
        fullList.addItem(newItem)
        setTasks([...tasks, { id, text: taskText }]);    
        setTaskText('');
    };

    const removeTask = (id: number) => {
        setTasks(tasks.filter(task => task.id !== id));
        fullList.removeItem(id.toString())
    };

    return (
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
      );
    };

export default ToDoList;