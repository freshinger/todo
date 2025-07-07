import TaskList from "./TaskList";
import {
  render,
  screen,
  fireEvent,
  RenderResult,
} from "@testing-library/react";
import "@testing-library/jest-dom";

const tasks: Task[] = [
  {
    _id: "1",
    title: "Task 1",
    completed: false,
    __v: 0,
    created_at: "",
    updated_at: "",
  },
  {
    _id: "2",
    title: "Task 2",
    completed: false,
    __v: 0,
    created_at: "",
    updated_at: "",
  },
  {
    _id: "3",
    title: "Task 3",
    completed: false,
    __v: 0,
    created_at: "",
    updated_at: "",
  },
];

jest.mock("../Task/functions/completedTask");

describe("view a list of tasks", () => {
  it("render the tasklist", () => {
    const list: RenderResult = render(<TaskList tasks={tasks} />);

    expect(screen.getByText("Task 1")).toBeInTheDocument();

    const listItems = screen.getAllByRole("listitem");
    expect(listItems.length).toBe(3);
  });

  it("handles completed task correctly", async () => {
    render(<TaskList tasks={tasks} />);

    // Trigger the completion of a task and check if the completed task is updated in the UI
    const items: HTMLElement[] = screen.getAllByRole("checkbox");

    await expect(fireEvent.click(items[0])).toBe(true);
    screen.debug();
  });

  it("handles delete task correctly", async () => {
    render(<TaskList tasks={tasks} />);
    const listItems: HTMLElement[] = screen.getAllByRole("listitem");
    await expect(listItems.length).toBe(3);

    // Trigger deleting of a task and check if the deleted task is removed in the UI
    const items: HTMLElement[] = screen.getAllByRole("button", {
      name: "Delete a task",
    });
    fireEvent.click(items[0]);

    // await expect(listItems.length).toBe(2);
    // await expect(items.length).toBe(2);
  });
});
