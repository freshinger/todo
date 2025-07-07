import {
  Checkbox,
  ListItem,
  UnorderedList,
  IconButton,
  Spacer,
  HStack,
  Input,
  Divider,
  Flex,
  useToast,
  Editable,
  EditableInput,
  EditablePreview,
  CreateToastFnReturn,
} from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
import { deleteTask } from "../Task/Functions/deleteTask";
import { editTask } from "../Task/Functions/editTask";
import { completedTask } from "../Task/Functions/completedTask";
import { MutatorCallback, useSWRConfig } from "swr";
import { ITaskState, useTaskStore } from "@/store";
import JSConfetti from "js-confetti";
import { IConfig } from "../../types/IConfig";

export default function TaskList({ tasks }: Tasks): React.JSX.Element {
  const toast: CreateToastFnReturn = useToast();
  const { mutate }: IConfig = useSWRConfig();
  const funMode: boolean = useTaskStore(
    (state: React.ComponentState) => state.funMode
  );
  const confetti: JSConfetti = new JSConfetti();
  const searchTerm: string = useTaskStore(
    (state: React.ComponentState) => state.searchTerm
  );

  const filteredTasks: Task[] = tasks.filter((task: Task) =>
    task.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  async function handleDeleteTask(taskId: number): Promise<void> {
    try {
      await deleteTask(taskId);
      mutate("/api/tasks");

      toast({
        title: "Task deleted",
        status: "warning",
        duration: 5000,
        isClosable: true,
      });
    } catch (error: any) {
      mutate("/api/tasks");
      toast({
        title: "Error deleting task",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  }
  async function handleEditTask(
    taskId: number,
    nextValue: string
  ): Promise<void> {
    try {
      mutate(
        "/api/tasks",
        (data: any) => {
          return data.map((task: Task) => {
            if (task._id === taskId) {
              return { ...task, title: nextValue };
            }
            return task;
          });
        },
        true
      );
      await editTask(taskId, nextValue);

      mutate("/api/tasks");
    } catch (error) {
      mutate("/api/tasks");
    }
  }

  async function handleCompletedTask(taskId: number): Promise<void> {
    try {
      const task: Task = await completedTask(taskId);
      if (task.completed) {
        if (funMode) {
          confetti.addConfetti({
            emojis: ["🌈", "🐻", "✏️", "✅", "🥳", "🎉", "🦄", "🐻", "🐼"],
            emojiSize: 150,
            confettiRadius: 100,
          });
        } else {
          toast({
            title: "Task Done",
            status: "success",
            duration: 5000,
            isClosable: true,
          });
        }
      }
    } catch (error: any) {
      toast({
        title: "Error completing task",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      mutate("/api/tasks");
    }
  }

  return (
    <UnorderedList styleType="none" spacing={2} marginTop={5}>
      {filteredTasks.map((task) => (
        <ListItem key={task._id}>
          <Flex alignItems="center">
            <HStack spacing="12px">
              <Checkbox
                colorScheme="teal"
                key={task._id}
                isChecked={task.completed}
                onChange={() => handleCompletedTask(task._id)}
              ></Checkbox>

              <Editable
                defaultValue={task.title}
                onSubmit={(nextValue) => handleEditTask(task._id, nextValue)}
              >
                <EditablePreview as={task.completed ? "del" : undefined} />
                <Input
                  as={EditableInput}
                  focusBorderColor="teal.400"
                  size="sm"
                />
              </Editable>
            </HStack>
            <Spacer />
            <IconButton
              aria-label="Delete a task"
              size="xs"
              color="red.300"
              margin="10px"
              icon={<DeleteIcon />}
              onClick={() => handleDeleteTask(task._id)}
            />
          </Flex>
          <Divider />
        </ListItem>
      ))}
    </UnorderedList>
  );
}
