import { createContext } from "preact";
import { StateUpdater } from "preact/hooks";

interface ThemeContext {
  theme: Theme;
  setTheme: StateUpdater<Theme>;
}

export default createContext<ThemeContext>(null);
