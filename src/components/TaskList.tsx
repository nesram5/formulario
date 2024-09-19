import { TaskListProps } from "@/interfaces/Items";
import { TaskItem } from "./TaskItem";

  export function TaskList({ tasks, toggleComplete, deleteTask }: TaskListProps) {
    return (
      <div>
        {tasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            toggleComplete={toggleComplete}
            deleteTask={deleteTask}
          />
        ))}
      </div>
    );
  }