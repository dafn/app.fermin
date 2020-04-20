import { createContext } from "preact";

interface Context {
  notes: Note[];
  activeIndex: number,
  setActiveIndex: (index: number) => void
  setNotes: (notes: Note[]) => void;
}

const context = createContext<Context>(null);

export const Provider = context.Provider;

export default context;
