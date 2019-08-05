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

export type Actions =
| 'END_ALERT'
| 'TOGGLE_ALERT'
| 'ADD_NOTE'
| 'SET_ACTIVE_KEY'
| 'SAVING'
| 'UPSERT_NOTE' 
| 'DELETE_NOTE'
| 'UPDATE_LIST'
| 'SET_STATE'

export type Action = {
  type: Actions,
  payload?: any
}

export type Context = {
  state: State,
  actions: {
    endAlert: () => void,
    toggleAlert: (alert: boolean) => void,
    addNote: () => void,
    setActiveKey: (key: number | string) => void,
    saving: () => void,
    upsertNote: (id: number | string, content: string) => void,
    deleteNote: (id: number | string, notes: Note[], activeKey: number | string) => void,
    updateList: () => void,
    setState: (payload: any) => void
  }
}
