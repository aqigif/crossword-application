import * as types from './../types';
import {AsyncStorage} from 'react-native';
const initialState = {
  isLoading: false,
  data: [],
  error: null
}

export default function crosswords(state = initialState, action) {
  switch (action.type) {
    case types.LOGIN:
      return {
        ...state,
        isLoading: true,
      };
    case "LOGIN_FULFILLED":
      return {
        ...state,
        isLoading: false,
        data: action.payload.data.token
      };
    case "LOGIN_REJECTED":
      alert(action.payload.message)
      return {
        ...state,
        isLoading: false,
        error: action.payload.message
      };
    case types.ADD_TODO:
      return {
        ...state,
        data: state.data.concat(action.payload)
      };
    case types.EDIT_TODOS:
      const newTodo = state.data.map(item => {
        if (item.id === action.payload.id) {
          return action.payload
        }

        return item
      })
      return {
        ...state,
        data: newTodo
      };
    case types.REMOVE_TODOS:
      const removeTodo = state.data.filter(item => item.id !== action.payload)
      return {
        ...state,
        data: removeTodo
      }
    default:
      return state
  }
}