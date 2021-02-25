import axios from "axios";
import { LOGIN_USER, LOGOUT_USER } from "./types";
import { api, versao } from "../config";
import { clearToken, getHeaders, saveToken, getToken } from "./localStorage";
import errorHandling from "./errorHandling";
import moment from 'moment'

export const initApp = () => {
  const opcaoLembrar = localStorage.getItem("opcaoLembrar");
  if (opcaoLembrar === "false") clearToken();
};

// USUARIOS

export const handleLogin = ({ email, password, opcaoLembrar }, cb) => {
  return async (dispatch) => {
    axios
      .post(`${api}/${versao}/api/usuarios/login`, { email, password })
      .then((response) => {
        saveToken(response.data.usuario, opcaoLembrar);
        dispatch({
          type: LOGIN_USER,
          payload: response.data,
        });
      })
      .catch((e) => cb(errorHandling(e)));
  };
};

export const getUser = () => {
  return (dispatch) => {
    axios
      .get(`${api}/${versao}/api/usuarios`, getHeaders())
      .then((response) => {
        saveToken(response.data.usuario, true);
        dispatch({ type: LOGIN_USER, payload: response.data });
      })
      .catch((error) => {
        if (error.response.data.code === "invalid_token") {
          console.log("Faça o login");
        }
      });
  };
};

export const updateUser = (dados, cb) => {
  return function(dispatch){
      axios.put(`${api}/${versao}/api/usuarios/`, dados, getHeaders())
      .then((response) => {
          saveToken(response.data.usuario, true);
          dispatch({ type: LOGIN_USER, payload: response.data });
          cb(null);
      })
      .catch((error) => cb(errorHandling(error)) );
  }
}

export const handleLogout = () => {
  clearToken();
  return { type: LOGOUT_USER };
};

export const formatMoney = (valor) => {
  return `R$ ${valor.toFixed(2).split(".").join(",")}`;
};

export const transformDate = (data, divisor, formato) => {
  const _data = data.split(divisor);
  const dia = Number(_data[0]) + 1;
  const mes = Number(_data[1] - 1);
  const ano = Number(_data[2]);
  return moment(new Date(ano, mes, dia)).format(formato);
};
