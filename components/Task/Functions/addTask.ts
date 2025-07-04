export default async function AddTask(taskTitle: titleForm): Promise<any> {
  console.log(taskTitle);
  try {
    const response = await fetch(`/api/tasks`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(taskTitle),
    });
    console.log(response);
  } catch (error) {
    console.log("ERROR !!");
  }
}
