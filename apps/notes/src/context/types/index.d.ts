export type Note = {
  id: string,
  content: string
}

export type State = {
  notes: Note[],
  activeKey: number | string,
  updateList: boolean,
  saving: boolean,
  saved: boolean,
  alert: boolean
}

export type ActionType = {
  type:
  | 'END_ALERT'
  | 'TOGGLE_ALERT'
  | 'ADD_NOTE'
  | 'SET_ACTIVE_KEY'
  | 'SAVING'
  | 'UPSERT_NOTE'
  | 'DELETE_NOTE'
  | 'UPDATE_LIST'
  | 'SET_STATE',
  payload?: any
}

export type Context = {
  state: State,
  actions: {
    endAlert: () => unknown,
    toggleAlert: (alert: boolean) => unknown,
    addNote: () => unknown,
    setActiveKey: (key: number | string) => unknown,
    saving: () => unknown,
    upsertNote: (id: number | string, content: string) => unknown,
    deleteNote: (id: number | string, notes: Note[], activeKey: number | string) => unknown,
    updateList: () => unknown,
    setState: (payload: any) => unknown
  }
}
