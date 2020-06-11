import { createContext } from "preact";
import { StateUpdater } from "preact/hooks";

interface AuthContext {
  isLoggedIn: boolean;
  setIsLoggedIn: StateUpdater<boolean>;
}

export default createContext<AuthContext>(null);
