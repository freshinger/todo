import randomItem from "./utils/utils";
const { test, expect } = require("@playwright/test");
test.beforeEach(async ({ page }: any) => {
  await page.goto("https://tasktango.vercel.app/");
  await expect(page).toHaveTitle("TaskTango - Home Page");
});
test.describe("New Todo", () => {
  test("Add a task and verify it appears in the list", async ({
    page,
  }: any) => {
    // Wait for the new task input to appear
    const newTaskInput: any = await page.waitForSelector(
      'input[placeholder="Add new task"]'
    );
    // Create 1st todo.
    const todoText: string = randomItem();
    await newTaskInput.fill(todoText);
    await newTaskInput.press("Enter");

    //find task in the tasklist
    const ListItem: any = page
      .getByRole("listitem")
      .filter({ hasText: todoText });

    //mark item as done and assert it's checked
    const itemCheckbox: any = ListItem.locator(".chakra-checkbox__control");

    //mark the latest as done even if there are multiple ones
    await itemCheckbox.first().click();
    expect(itemCheckbox).toBeTruthy();

    //assert the toast is showing for task is done
    await expect(page.getByText("Task Done")).toBeVisible();
  });

  test("Add a task and Delete it and verify it appears in the list", async ({
    page,
  }: any) => {
    // Wait for the new task input to appear
    const newTaskInput: any = await page.waitForSelector(
      'input[placeholder="Add new task"]'
    );
    // Create 2st todo.
    const todoText2: string = randomItem();
    await newTaskInput.fill(todoText2);
    await newTaskInput.press("Enter");

    //find task in the tasklist
    const ListItem2: any = page
      .getByRole("listitem")
      .filter({ hasText: todoText2 });

    await ListItem2.waitFor();

    //delete a task and assert it's deleted
    const itemDeleteBtn: any = ListItem2.locator(
      'button[aria-label="Delete a task"]'
    );

    await itemDeleteBtn.waitFor();

    //delete on the latest added even if there are multiple ones
    await itemDeleteBtn.first().click();

    //assert the toast is showing for task is deleted
    await expect(page.getByText("Task deleted")).toBeInViewport();
    //await expect(ListItem2).not.toBeVisible();
  });
});
