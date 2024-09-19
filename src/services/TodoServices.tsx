import { Item } from "@/interfaces/Items";

export const loadTasksFromLocalStorage = (): Item[] => {
    const tasks = localStorage.getItem('tasks');
    return tasks ? JSON.parse(tasks) : [];
  };
  
export const saveTasksToLocalStorage = (tasks: Item[]) => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  };