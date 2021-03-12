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

    return loadLists()

  }
}


// THIS IS A BAD WAY OF HANDLING THIS,
// I WOULD RATHER GO BACK AND CHANGE THIS TO BE A DICTIONARY
// BUT DUE TO TIME I'M MOVING FORWARD

const _updateTitle = (state, list) => {
  for (let i = 0; i < state.length; i++) {
    if (state[i].id == list.id) {
      state[i].title = list.title
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
      _updateTitle(newState, action.payload)
      return newState

    default:
      return state
  }
}

export default listReducer
