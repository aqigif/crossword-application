import * as types from "../types";
import {Alert} from 'react-native';
import config from "../../../config";
    
import axios from 'axios';

export const login = (value) => ({
  type: types.LOGIN,
  payload: axios({
    method: "POST",
    url: `http://${config.BASE_URL}:3333/api/auth/login`,
    data: {
      email: value.email,
      password: value.password
    }
  })
})
export const register = (value) => ({
  type: types.REGISTER,
  payload: axios({
    method: "POST",
    url: `http://${config.BASE_URL}:3333/api/users`,
    data: {
      username: value.username,
      email: value.email,
      password: value.password
    }
  })
});
export const menu = () => ({
  type: types.GETMENU,
  payload: axios({
    method: "GET",
    url: `http://${config.BASE_URL}:3333/api/crosswords`,
  })
});

export const getCrosswords = () => ({
  type: types.GETCROSSWORDS,
  payload: axios({
    method: "GET",
    url: `http://${config.BASE_URL}/api/crosswords`
  })
});

export const getBox = () => ({
  type: types.GETBOX,
  payload: axios({
    method: "GET",
    url: `http://${config.BASE_URL}/api/crosswords`
  })
});

export const answer = () => ({
  type: types.ANSWER,
  payload: axios({
    method: "POST",
    url: `http://${config.BASE_URL}/api/crosswords`,
    data: {
      value
    }
  })
});
