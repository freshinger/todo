import { Input, InputLeftElement, InputGroup } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import AddTask from "./Functions/addTask";
import { useSWRConfig } from "swr";
import { FullConfiguration } from "swr/_internal";

export default function AddTaskInput({
  afterSubmit,
}: afterSubmit): JSX.Element {
  const { mutate }: FullConfiguration = useSWRConfig();

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    let formData: FormData = new FormData();

    if (event) {
      event.preventDefault();
    }
    if (event.target instanceof HTMLFormElement) {
      formData = new FormData(event.target);
    }
    const taskTitle: titleForm = Object.fromEntries(formData) as titleForm;

    try {
      await AddTask(taskTitle);
      mutate("/api/tasks");
      let inputElement: HTMLInputElement | undefined;
      if (event.target && event.target instanceof HTMLFormElement) {
        if (
          event.target.elements.namedItem("title") !== null &&
          event.target.elements.namedItem("title") instanceof HTMLInputElement
        ) {
          inputElement = event.target.elements.namedItem(
            "title"
          ) as HTMLInputElement;
        }
      }
      if (inputElement) inputElement.focus();

      if (event.target && event.target instanceof HTMLFormElement) {
        event.target.reset();
      }

      // with this, we can let the caller know that submit has been successfully handled
      if (afterSubmit && typeof afterSubmit === "function") {
        afterSubmit();
      }
    } catch (error) {
      console.error("Error adding task:", error);
    } finally {
      mutate("/api/tasks");
    }
  }
  return (
    <form onSubmit={handleSubmit}>
      <InputGroup>
        <InputLeftElement pointerEvents="none">
          <AddIcon color="gray.300" />
        </InputLeftElement>
        <Input
          aria-label="add New Task"
          focusBorderColor="teal.400"
          autoFocus
          id="title"
          name="title"
          type="text"
          placeholder="Add new task"
        />
      </InputGroup>
    </form>
  );
}
