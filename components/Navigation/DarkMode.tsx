import { useTaskStore } from "@/store";
import {
  ColorModeContextType,
  FormControl,
  FormLabel,
  Switch,
  useColorMode,
} from "@chakra-ui/react";

export default function DarkMode(): JSX.Element {
  const { toggleColorMode }: ColorModeContextType = useColorMode();
  const [darkMode, toggleDarkMode] = useTaskStore(
    (state: React.ComponentState) => [state.darkMode, state.toggleDarkMode]
  );

  function toggle() {
    toggleColorMode();
    toggleDarkMode();
  }
  return (
    <FormControl
      display="flex"
      alignItems="center"
      justifyContent="space-between"
    >
      <FormLabel htmlFor="dark-mode" mb="0">
        Dark Mode
      </FormLabel>
      <Switch
        colorScheme="teal"
        id="dark-mode"
        isChecked={darkMode}
        onChange={toggle}
      />
    </FormControl>
  );
}
