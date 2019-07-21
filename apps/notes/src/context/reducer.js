import { types } from './types'
import update from 'immutability-helper'

export const initialState = {
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

export const reducer = (state, action) => {
  switch (action.type) { 
    case types.END_ALERT:
      return { ...state, saved: false }
    case types.TOGGLE_ALERT:
      return { ...state, alert: action.payload.alert }
    case types.ADD_NOTE:
      return update(state, { notes: { $push: [{ id: '', content: '' }] } })
    case types.SET_ACTIVE_KEY:
      return { ...state, activeKey: action.payload.key }
    case types.SAVING:
      return { ...state, saving: true }
    case types.UPSERT_NOTE:
      return { ...state, saving: action.payload.saving, saved: action.payload.saved, updateList: action.payload.updateList }
    case types.DELETE_NOTE:
      return { ...state, notes: action.payload.notes, alert: action.payload.alert, activeKey: action.payload.activeKey }
    case types.UPDATE_LIST:
      return { ...state, notes: action.payload.notes, updateList: action.payload.updateList }
    case types.SET_STATE:
      return { ...state, ...action.payload }
    default:
      throw new Error();
  }
}
