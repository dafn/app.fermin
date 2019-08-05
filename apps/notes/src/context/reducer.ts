import { State, Action } from './types'
import update from 'immutability-helper'

export const initialState: State = {
  notes: [{
    id: '',
    content: ''
  }],
  activeKey: 0,
  updateList: true,
  saving: false,
  saved: false,
  alert: false
}

export const reducer = (state: State, action: Action) => {
  switch (action.type) { 
    case 'END_ALERT':
      return { ...state, saved: false }
    case 'TOGGLE_ALERT':
      return { ...state, alert: action.payload.alert }
    case 'ADD_NOTE':
      return update(state, { notes: { $push: [{ id: '', content: '' }] } })
    case 'SET_ACTIVE_KEY':
      return { ...state, activeKey: action.payload.key }
    case 'SAVING':
      return { ...state, saving: true }
    case 'UPSERT_NOTE':
      return { ...state, saving: action.payload.saving, saved: action.payload.saved, updateList: action.payload.updateList }
    case 'DELETE_NOTE':
      return { ...state, notes: action.payload.notes, alert: action.payload.alert, activeKey: action.payload.activeKey }
    case 'UPDATE_LIST':
      return { ...state, notes: action.payload.notes, updateList: action.payload.updateList }
    case 'SET_STATE':
      return { ...state, ...action.payload }
    default:
      throw new Error();
  }
}
