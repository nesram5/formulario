export interface Item {
    id: string;
    title: string;
    completed: boolean;
}
export interface TaskItemProps {
    task: Item;
    toggleComplete: (id: string) => void;
    deleteTask: (id: string) => void;
}

export interface TaskFormProps {
    addTask: (title: string) => void;
}

export interface TaskListProps {
    tasks: Item[];
    toggleComplete: (id: string) => void;
    deleteTask: (id: string) => void;
}