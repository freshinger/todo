export default async function AddTask(taskTitle: titleForm): Promise<void> {
  console.log(taskTitle);
  try {
    const response: Response = await fetch(`/api/tasks`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(taskTitle),
    });
  } catch (error) {
    console.log("ERROR !!");
  }
}
