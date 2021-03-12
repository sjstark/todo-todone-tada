import Axios from 'axios'

const SET_LISTS = 'session/setLists'
const ADD_LIST = 'session/addList'
const UPDATE_LIST = 'session/updateList'


const setLists = (lists) => ({
  type: SET_LISTS,
  payload: lists
})

const addList = (list) => ({
  type: ADD_LIST,
  payload: list
})

const _updateList = (list) => ({
  type: UPDATE_LIST,
  payload: list
})


export const loadLists = () => {
  return async dispatch => {
    const res = await Axios.get('/api/lists')

    dispatch(setLists(res.data))

    return res
  }
}


export const createNewList = (list) => {
  return async dispatch => {
    const { title } = list

    const formData = new FormData();
    formData.append('title', title)

    const config = {
      headers: {
        'content-type': 'multipart/form-data'
      }
    }

    return Axios.post('/api/lists', formData, config)
      .then(res => {
        const list = res.data;
        return dispatch(addList(list))
      })
      .catch((err) => {
        return err.response
      })
  }
}


export const updateList = (list) => {
  return async dispatch => {
    const formData = new FormData();
    formData.append('title', list.title)

    const config = {
      headers: {
        'content-type': 'multipart/form-data'
      }
    }

    return Axios.put(`/api/lists/${list.id}`, formData, config)
      .then(res => {
        const list = res.data;
        return dispatch(_updateList(list))
      })
      .catch((err) => {
        return err.response
      })
  }
}


export const deleteList = (listId) => {
  return async dispatch => {
    const res = await Axios.delete(`/api/lists/${listId}`)

    if (res.data.errors) {
      return res.data.errors
    }

    return dispatch(loadLists())

  }
}

export const addTask = (task, listId) => {
  return async dispatch => {
    const formData = new FormData();
    formData.append('title', task.title)
    formData.append('description', task.description)

    const config = {
      headers: {
        'content-type': 'multipart/form-data'
      }
    }

    Axios.post(`/api/lists/${listId}/tasks`, formData, config)
      .then(res => {
        const list = res.data;
        return dispatch(_updateList(list))
      })
      .catch((err) => {
        return err.response
      })

  }
}


export const toggleTask = (listId, taskId) => {
  return async dispatch => {

    Axios.post(`/api/lists/${listId}/tasks/${taskId}/toggle`)
      .then(res => {
        const list = res.data;
        return dispatch(_updateList(list))
      })
      .catch((err) => {
        return err.response
      })

  }
}

export const deleteTask = (listId, taskId) => {
  return async dispatch => {
    const res = await Axios.delete(`/api/lists/${listId}/tasks/${taskId}`)

    if (res.data.errors) {
      return res.data.errors
    }

    return dispatch(loadLists())

  }
}


export const createComment = (listId, taskId, comment) => {
  return async dispatch => {
    const formData = new FormData();
    formData.append('text', comment.text)

    const config = {
      headers: {
        'content-type': 'multipart/form-data'
      }
    }

    Axios.post(`/api/lists/${listId}/tasks/${taskId}/comments`, formData, config)
      .then(res => {
        // quick reload, in reality we want to update with just the comment.
        // This would be best done with restructuring the state to be a dictionary
        return dispatch(loadLists())
      })
      .catch((err) => {
        return err.response
      })

  }
}

export const deleteComment = (listId, taskId, commentId) => {
  return async dispatch => {
    const res = await Axios.delete(`/api/lists/${listId}/tasks/${taskId}/comments/${commentId}`)

    if (res.data.errors) {
      return res.data.errors
    }

    return dispatch(loadLists())

  }
}


// THIS IS A BAD WAY OF HANDLING THIS,
// I WOULD RATHER GO BACK AND CHANGE THIS TO BE A DICTIONARY
// BUT DUE TO TIME I'M MOVING FORWARD

const _copyListToUpdate = (state, list) => {
  for (let i = 0; i < state.length; i++) {
    if (state[i].id == list.id) {
      state[i] = { ...list }
      return
    }
  }
}


// Would be better to change this to an dictionary so we can update the lists based on id
let initialState = []

function listReducer(state = initialState, action) {
  let newState;
  switch (action.type) {

    case SET_LISTS:
      newState = [...action.payload]
      return newState;

    case ADD_LIST:
      newState = [...state]
      newState.push(action.payload)
      return newState

    case UPDATE_LIST:
      newState = [...state]
      _copyListToUpdate(newState, action.payload)
      return newState

    default:
      return state
  }
}

export default listReducer
