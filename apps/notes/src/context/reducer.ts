import { actionTypes } from './actionTypes'
import { State } from './types'
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

export const reducer = (state: State, action) => {
  switch (action.type) { 
    case actionTypes.END_ALERT:
      return { ...state, saved: false }
    case actionTypes.TOGGLE_ALERT:
      return { ...state, alert: action.payload.alert }
    case actionTypes.ADD_NOTE:
      return update(state, { notes: { $push: [{ id: '', content: '' }] } })
    case actionTypes.SET_ACTIVE_KEY:
      return { ...state, activeKey: action.payload.key }
    case actionTypes.SAVING:
      return { ...state, saving: true }
    case actionTypes.UPSERT_NOTE:
      return { ...state, saving: action.payload.saving, saved: action.payload.saved, updateList: action.payload.updateList }
    case actionTypes.DELETE_NOTE:
      return { ...state, notes: action.payload.notes, alert: action.payload.alert, activeKey: action.payload.activeKey }
    case actionTypes.UPDATE_LIST:
      return { ...state, notes: action.payload.notes, updateList: action.payload.updateList }
    case actionTypes.SET_STATE:
      return { ...state, ...action.payload }
    default:
      throw new Error();
  }
}
