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
  .catch(err=>{
    alert('Username atau Password Salah')
  })
})
export const register = () => ({
  type: types.REGISTER,
  payload: axios({
    method: "POST",
    url: `https://${config.BASE_URL}/api/v1/users`,
    data: {
      value
    }
  })
});

export const getCrosswords = () => ({
  type: types.GETCROSSWORDS,
  payload: axios({
    method: "GET",
    url: `https://${config.BASE_URL}/api/v1/crosswords`
  })
});

export const getBox = () => ({
  type: types.GETBOX,
  payload: axios({
    method: "GET",
    url: `https://${config.BASE_URL}/api/v1/crosswords`
  })
});

export const answer = () => ({
  type: types.ANSWER,
  payload: axios({
    method: "POST",
    url: `https://${config.BASE_URL}/api/v1/crosswords`,
    data: {
      value
    }
  })
});
