import { TaskItemProps } from "@/interfaces/Items";
  
  export function TaskItem({ task, toggleComplete, deleteTask }: TaskItemProps) {
    return (
      <div className="listItem">
        <input 
          title="checkbox"
          type="checkbox"
          checked={task.completed}
          onChange={() => toggleComplete(task.id)}
        />
        <span style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
          {task.title}
        </span>
        <button onClick={() => deleteTask(task.id)}>Delete</button>
      </div>
    );
  }