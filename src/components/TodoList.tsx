"use client"
import '@/styles/todoList.scss';
import { useState , useEffect } from 'react';
import  TaskForm  from '@/components/taskForm';
import { TaskList } from '@/components/taskList';
import { Item } from '@/interfaces/items';
import { loadTasksFromLocalStorage, saveTasksToLocalStorage } from '@/services/todoServices';

export const TodoList: React.FC = () => {
  

  const [tasks, setTasks] = useState<Item[]>([]);
  
  useEffect(() => {
    const loadPreviousTasks: Item[] = loadTasksFromLocalStorage(); 
    if (loadPreviousTasks && loadPreviousTasks.length > 0) {
      setTasks(loadPreviousTasks);
    }
  }, []);
  
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
      <div className='toDoBody'>
      <TaskForm addTask={addTask} />
      <TaskList tasks={tasks} toggleComplete={toggleComplete} deleteTask={deleteTask} />
      </div>
    </div>
  );
}
