import Axios from 'axios'

const SET_LISTS = 'session/setLists'
const ADD_LIST = 'session/addList'


const setLists = (lists) => ({
  type: SET_LISTS,
  payload: lists
})

const addList = (list) => ({
  type: ADD_LIST,
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


export const deleteList = (listId) => {
  return async dispatch => {
    const res = await Axios.delete(`/api/lists/${listId}`)

    if (res.data.errors) {
      return res.data.errors
    }

    return loadLists()

  }
}



let initialState = {
  lists: []
}

function listReducer(state = initialState, action) {
  let newState;
  switch (action.type) {

    case SET_LISTS:
      newState = { lists: action.payload }
      return newState;

    case ADD_LIST:
      newState = Object.assign({}, state)
      newState.lists.push(action.payload)
      return newState

    default:
      return state
  }
}

export default listReducer
