import { createContext } from "preact";

interface Context {
  cvs: CV[];
  activeIndex: number;
  setActiveIndex: (index: number) => void;
  setCvs: (notes: CV[]) => void;
  deleteCv: (index: number) => void;
}

const context = createContext<Context>(null);

export const Provider = context.Provider;

export default context;
