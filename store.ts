import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export interface ITaskState {
  funMode: boolean;
  setupMode: boolean;
  finishSetup: () => void;
  activeList: string | null;
  setActiveList: (newActiveTask: string) => void;
  searchTerm: string;
  setSearchTerm: (newSearchTerm: string) => void;
  toggleFunMode: () => void;
  countingTasks: Task[];
  setCountingTasks: (newCountingTasks: Task[]) => void;
  countCompletedTasks: number;
  countActiveTasks: number;
  setCountCompletedTasks: (countingTasks: Task[]) => void;
  setActiveTasks: (countingTasks: Task[]) => void;
}

export const useTaskStore = create<ITaskState>()(
  persist(
    (set) => ({
      funMode: false,
      setupMode: true,
      finishSetup: () => set({ setupMode: false }),
      activeList: null,
      setActiveList: (newActiveList: string) =>
        set({ activeList: newActiveList }),
      searchTerm: "",
      setSearchTerm: (newSearchTerm: string) =>
        set({ searchTerm: newSearchTerm }),
      toggleFunMode: () =>
        set((state: React.ComponentState) => ({
          funMode: !state.funMode,
        })),
      countingTasks: [],
      setCountingTasks: (newCountingTasks: Task[]) =>
        set({ countingTasks: newCountingTasks }),
      countCompletedTasks: 0,
      countActiveTasks: 0,

      setCountCompletedTasks: (countingTasks: Task[]) => {
        const count = countingTasks.reduce(
          (count: number, task: Task) => (task.completed ? count + 1 : count),
          0
        );
        set({ countCompletedTasks: count });
      },

      setActiveTasks: (countingTasks: Task[]) => {
        const countCompleted = countingTasks.reduce(
          (count: number, task: Task) => (task.completed ? count + 1 : count),
          0
        );
        const active = countingTasks.length - countCompleted;
        set({ countActiveTasks: active });
      },
    }),

    {
      name: "task-tango-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
