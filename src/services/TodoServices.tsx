"use client"

import  { Item }  from "@/interfaces/items";

export const loadTasksFromLocalStorage = (): Item[] => {
    const tasks = localStorage.getItem('tasks');
    return tasks ? JSON.parse(tasks) : [];
  };
  
export const saveTasksToLocalStorage = (tasks: Item[]) => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  };