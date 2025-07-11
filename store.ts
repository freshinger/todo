import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { ITaskState, Task } from "./types/task";

export const useTaskStore = create<ITaskState>()(
  persist(
    (set) => ({
      darkMode: false,
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
      toggleDarkMode: () =>
        set((state: React.ComponentState) => ({
          darkMode: !state.darkMode,
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
