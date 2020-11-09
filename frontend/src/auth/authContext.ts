import { createContext } from "preact";
import { StateUpdater } from "preact/hooks";

interface AuthContext {
  user: User,
  isLoggedIn: boolean;
  setUser: StateUpdater<User>,
  setIsLoggedIn: StateUpdater<boolean>;
}

export default createContext<AuthContext>(null);
