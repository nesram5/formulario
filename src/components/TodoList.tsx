"use client"
import '@/styles/todoList.scss';
import { useState , useEffect } from 'react';
import  TaskForm  from './TaskForm';
import { TaskList } from './TaskList';
import { Item } from '@/interfaces/Items';
import { loadTasksFromLocalStorage, saveTasksToLocalStorage } from '@/services/TodoServices';

export const TodoList: React.FC = () => {
  const [tasks, setTasks] = useState<Item[]>(loadTasksFromLocalStorage());

  useEffect(() => {
    saveTasksToLocalStorage(tasks);
  }, [tasks]);

  const addTask = (title: string) => {
    const newTask: Item = {
      id: crypto.randomUUID(),
      title,
      completed: false,
    };
    setTasks((prevTasks) => [...prevTasks, newTask]);
  };

  const toggleComplete = (id: string) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id: string) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  return (
    <div>
      <h1>My ToDo List </h1>
      <div id='listItems'>
      <TaskForm addTask={addTask} />
      <TaskList tasks={tasks} toggleComplete={toggleComplete} deleteTask={deleteTask} />
      </div>
    </div>
  );
}
