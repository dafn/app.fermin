type Note = {
  id: string,
  content: string
}

export type State = {
  notes: Note[],
  activeKey: number,
  updateList: boolean,
  saving: boolean,
  saved: boolean,
  alert: boolean
}

export type Action = {
  type: string,
  payload?: Object
}
