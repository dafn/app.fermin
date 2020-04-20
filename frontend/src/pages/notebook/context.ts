import { createContext } from "preact";

interface Context {
  notes: Note[];
  setNotes: (notes: Note[]) => void;
}

const context = createContext<Context>(null);

export const Provider = context.Provider;

export default context;
