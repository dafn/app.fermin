import { actionTypes } from './actionTypes'
import { database } from '../api'

export default (dispatch) => {
  return {
    endAlert: () => {
      dispatch({ type: actionTypes.END_ALERT })
    },
    toggleAlert: alert => {
      dispatch({ type: actionTypes.TOGGLE_ALERT, payload: { alert } })
    },
    addNote: () => {
      dispatch({ type: actionTypes.ADD_NOTE })
    },
    setActiveKey: key => {
      dispatch({ type: actionTypes.SET_ACTIVE_KEY, payload: { key } })
    },
    saving: () => {
      dispatch({ type: actionTypes.SAVING })
    },
    upsertNote: (id, content) => {
      database.upsertNote(id, content)
      .then(response => {
        dispatch({ type: actionTypes.UPSERT_NOTE, payload: { saving: false, saved: true, updateList: true } })
      })
      .catch(err => {
        console.log(err)
        dispatch({ type: actionTypes.UPSERT_NOTE, payload: { saving: false, saved: true, updateList: true } })
      })
    },
    deleteNote: (id, notes, activeKey) => {
      if (id)
        database.deleteNote(id)
        .then(() => {
          notes.splice(activeKey, 1)
          dispatch({ type: actionTypes.DELETE_NOTE, payload: { notes, alert: false, activeKey: activeKey - 1 > 0 ? activeKey - 1 : 0 } })
        })
        .catch(err => {
          console.log(err)
        })
      else {
        notes.splice(activeKey, 1)
        dispatch({ type: actionTypes.DELETE_NOTE, payload: { notes, alert: false, activeKey: activeKey - 1 > 0 ? activeKey - 1 : 0 } })
      }
    },
    updateList: () => {
      database.updateList()
        .then(response =>
          dispatch({
            type: actionTypes.SET_STATE,
            payload: {
              updateList: false,
              notes: response.Notes.length !== 0 ? response.Notes : [{ id: '', content: '' }]
            }
          }))
        .catch(err => dispatch({ saving: false, updateList: false }))
    },
    setState: payload => {
      dispatch({ type: actionTypes.SET_STATE, payload })
    }
  }
}
