export interface Task {
    id: string;
    task_uuid: string | null;
    title: string | null;
    description: string | null;
    emoji: string | null;
    progress: string | null;
  }

export interface TaskStore {
  tasks: Task[];
  addTask: (task: Omit<Task, "id">) => void;
}

// Array of Tasks interface
export type Tasks = Task[];