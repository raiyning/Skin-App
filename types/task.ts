export interface Task {
    id: number;
    title: string;
    description: string;
    emoji: string;
    progress: string;
  }

export interface TaskStore {
  tasks: Task[];
  addTask: (task: Omit<Task, "id">) => void;
}

// Array of Tasks interface
export type Tasks = Task[];