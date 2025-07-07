type Task = {
  _id: string;
  __v: number;
  title: string;
  completed: boolean;
  created_at: string;
  updated_at: string;
};
type Tasks = {
  tasks: Task[];
};
export interface ITaskState {
  darkMode: boolean;
  funMode: boolean;
  setupMode: boolean;
  finishSetup: () => void;
  activeList: string | null;
  setActiveList: (newActiveTask: string) => void;
  searchTerm: string;
  setSearchTerm: (newSearchTerm: string) => void;
  toggleFunMode: () => void;
  toggleDarkMode: () => void;
  countingTasks: Task[];
  setCountingTasks: (newCountingTasks: Task[]) => void;
  countCompletedTasks: number;
  countActiveTasks: number;
  setCountCompletedTasks: (countingTasks: Task[]) => void;
  setActiveTasks: (countingTasks: Task[]) => void;
}
