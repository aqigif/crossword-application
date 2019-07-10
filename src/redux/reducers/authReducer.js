import * as types from './../types';
import {AsyncStorage} from 'react-native';
const initialState = {
  data: [],
  error: null,
  isLoading: false,
  saveToken: ""
}

function auth(state = initialState, action) {
  switch (action.type) {
    case types.LOGIN:
      return {
        ...state,
        isLoading: true,
      };
    case "LOGIN_FULFILLED":
        console.log(action.payload)
      return {
        ...state,
        isLoading: false,
        saveToken: AsyncStorage.setItem('token', action.payload.data.token),
        
    };
    case "LOGIN_REJECTED":
      return {
        ...state,
        isLoading: false,
        error: action.payload.message
      };
    case types.REGISTER:
      return {
        ...state,
        isLoading: true,
      };
    case "REGISTER_FULFILLED":
      return {
        ...state,
        isLoading: false,
        data: action.payload.data
      };
    case "REGISTER_REJECTED":
      alert(action.payload.message)
      return {
        ...state,
        isLoading: false,
        error: action.payload.message
      };

    default:
      return state
  }
}

export default auth