import { database } from '../api'
import { Dispatch } from 'react';
import { Action } from './types';

export default (dispatch: Dispatch<Action>) => {
  return {
    endAlert: () => {
      dispatch({ type: 'END_ALERT' })
    },
    toggleAlert: alert => {
      dispatch({ type: 'TOGGLE_ALERT', payload: { alert } })
    },
    addNote: () => {
      dispatch({ type: 'ADD_NOTE' })
    },
    setActiveKey: key => {
      dispatch({ type: 'SET_ACTIVE_KEY', payload: { key } })
    },
    saving: () => {
      dispatch({ type: 'SAVING' })
    },
    upsertNote: (id, content) => {
      database.upsertNote(id, content)
      .then(response => {
        dispatch({ type: 'UPSERT_NOTE', payload: { saving: false, saved: true, updateList: true } })
      })
      .catch(err => {
        console.log(err)
        dispatch({ type: 'UPSERT_NOTE', payload: { saving: false, saved: true, updateList: true } })
      })
    },
    deleteNote: (id, notes, activeKey) => {
      if (id)
        database.deleteNote(id)
        .then(() => {
          notes.splice(activeKey, 1)
          dispatch({ type: 'DELETE_NOTE', payload: { notes, alert: false, activeKey: activeKey - 1 > 0 ? activeKey - 1 : 0 } })
        })
        .catch(err => {
          console.log(err)
        })
      else {
        notes.splice(activeKey, 1)
        dispatch({ type: 'DELETE_NOTE', payload: { notes, alert: false, activeKey: activeKey - 1 > 0 ? activeKey - 1 : 0 } })
      }
    },
    updateList: () => {
      database.updateList()
        .then(response =>
          dispatch({
            type: 'SET_STATE',
            payload: {
              updateList: false,
              notes: response.Notes.length !== 0 ? response.Notes : [{ id: '', content: '' }]
            }
          }))
        .catch(err => dispatch({ type: 'SET_STATE', payload: { saving: false, updateList: false } } ))
    },
    setState: payload => {
      dispatch({ type: 'SET_STATE', payload })
    }
  }
}