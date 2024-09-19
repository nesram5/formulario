import { TaskListProps } from "@/interfaces/items";
import TaskItem  from "@/components/taskItem";

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