import { types } from './types'
import { database } from '../api'

export default (dispatch) => {
  return {
    endAlert: () => {
      dispatch({ type: types.END_ALERT })
    },
    toggleAlert: alert => {
      dispatch({ type: types.TOGGLE_ALERT, payload: { alert } })
    },
    addNote: () => {
      dispatch({ type: types.ADD_NOTE })
    },
    setActiveKey: key => {
      dispatch({ type: types.SET_ACTIVE_KEY, payload: { key } })
    },
    saving: () => {
      dispatch({ type: types.SAVING })
    },
    upsertNote: (id, content) => {
      database.upsertNote(id, content)
      .then(response => {
        dispatch({ type: types.UPSERT_NOTE, payload: { saving: false, saved: true, updateList: true } })
      })
      .catch(err => {
        console.log(err)
        dispatch({ type: types.UPSERT_NOTE, payload: { saving: false, saved: true, updateList: true } })
      })
    },
    deleteNote: (id, notes, activeKey) => {
      if (id)
        database.deleteNote(id)
        .then(() => {
          notes.splice(activeKey, 1)
          dispatch({ type: types.DELETE_NOTE, payload: { notes, alert: false, activeKey: activeKey - 1 > 0 ? activeKey - 1 : 0 } })
        })
        .catch(err => {
          console.log(err)
        })
      else {
        notes.splice(activeKey, 1)
        dispatch({ type: types.DELETE_NOTE, payload: { notes, alert: false, activeKey: activeKey - 1 > 0 ? activeKey - 1 : 0 } })
      }
    },
    updateList: () => {
      database.updateList()
        .then(response =>
          dispatch({
            type: types.SET_STATE,
            payload: {
              updateList: false,
              notes: response.Notes.length !== 0 ? response.Notes : [{ id: '', content: '' }]
            }
          }))
        .catch(err => dispatch({ saving: false, updateList: false }))
    },
    setState: payload => {
      dispatch({ type: types.SET_STATE, payload })
    }
  }
}
