import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export const useTaskStore = create(
  persist(
    (set) => ({
      funMode: false,
      setupMode: true,
      finishSetup: () => set({ setupMode: false }),
      activeList: null,
      setActiveList: (newActiveList: any) => set({ activeList: newActiveList }),
      searchTerm: "",
      setSearchTerm: (newSearchTerm: any) => set({ searchTerm: newSearchTerm }),
      toggleFunMode: () =>
        set((state: React.ComponentState) => ({
          funMode: !state.funMode,
        })),
      countingTasks: [],
      setCountingTasks: (newCountingTasks: any) =>
        set({ countingTasks: newCountingTasks }),
      countCompletedTasks: 0,
      countActiveTasks: 0,

      setCountCompletedTasks: (countingTasks: any) => {
        const count = countingTasks.reduce(
          (count: number, task: Task) => (task.completed ? count + 1 : count),
          0
        );
        set({ countCompletedTasks: count });
      },

      setActiveTasks: (countingTasks: any) => {
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
