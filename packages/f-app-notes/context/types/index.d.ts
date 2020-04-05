declare global {
  interface Note {
    id: string;
    content: string;
  }
  interface State {
    notes: Note[];
    activeKey: number;
    updateList: boolean;
    saving: boolean;
    saved: boolean;
    alert: boolean;
  }
}

export interface Context {
  state: State;
  actions: {
    endAlert: () => void;
    toggleAlert: (alert: boolean) => void;
    addNote: () => void;
    setActiveKey: (key: number | string) => void;
    saving: () => void;
    upsertNote: (id: number | string, content: string) => void;
    deleteNote: (
      id: number | string,
      notes: Note[],
      activeKey: number | string
    ) => void;
    updateList: () => void;
    setState: (payload: any) => void;
  };
}

export type ActionType = {
  type:
    | "END_ALERT"
    | "TOGGLE_ALERT"
    | "ADD_NOTE"
    | "SET_ACTIVE_KEY"
    | "SAVING"
    | "UPSERT_NOTE"
    | "DELETE_NOTE"
    | "UPDATE_LIST"
    | "SET_STATE";
  payload?: any;
};
