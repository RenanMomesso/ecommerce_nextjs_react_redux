import { api, versao } from "../config";
import { getHeaders } from "./localStorage";
import axios from "axios";
import errorHandling from "./errorHandling";
import {
  GET_CATEGORIA,
  GET_CATEGORIAS,
  GET_CATEGORIAS_PRODUTOS,
  GET_CLIENTES,
  LIMPAR_CATEGORIAS,
  REMOVER_CATEGORIA,
} from "./types";

export const getCategorias = (loja) => {
  return (dispatch) => {
    axios
      .get(`${api}/${versao}/api/categorias?loja=${loja}`, getHeaders())
      .then((response) => {
        dispatch({
          type: GET_CATEGORIAS,
          payload: response.data,
        });
      })
      .catch(errorHandling);
  };
};

export const salvarCategoria = (categoria, loja, cb) => {
  return (dispatch) => {
    axios
      .post(
        `${api}/${versao}/api/categorias?loja=${loja}`,
        {
          nome: categoria.nome,
          codigo: categoria.codigo,
        },
        getHeaders()
      )
      .then((response) => {
        console.log("categoria", categoria);
        dispatch({
          type: GET_CATEGORIAS,
          payload: response.data,
        });
        cb(null);
      })
      .catch((e) => cb(errorHandling(e)));
  };
};

export const getCategoria = (id, loja) => {
  return (dispatch) => {
    axios
      .get(`${api}/${versao}/api/categorias/${id}?loja=${loja}`, getHeaders())
      .then((response) =>
        dispatch({ type: GET_CATEGORIA, payload: response.data })
      )
      .catch(errorHandling);
  };
};

export const limparCategorias = () => ({ type: LIMPAR_CATEGORIAS });

export const getCategoriaProdutos = (id, atual, limite, loja) => {
  return (dispatch) => {
    axios
      .get(
        `${api}/${versao}/api/categorias/${id}/produtos?loja=${loja}&offset=${atual}&limit=${limite}`,
        getHeaders()
      )
      .then((response) =>
        dispatch({ type: GET_CATEGORIAS_PRODUTOS, payload: response.data })
      )
      .catch(errorHandling);
  };
};

export const updateCategoria = (categoria, id, loja, cb) => {
  return (dispatch) => {
    axios
      .put(
        `${api}/${versao}/api/categorias/${id}/?loja=${loja}`,
        {
          nome: categoria.nome,
          codigo: categoria.codigo,
          disponibilidade:
            categoria.disponibilidade === "disponivel" ? "true" : "false",
        },
        getHeaders()
      )
      .then((response) => {
        console.log("categoria", categoria);
        dispatch({
          type: GET_CATEGORIA,
          payload: response.data,
        });
        cb(null);
      })
      .catch((e) => cb(errorHandling(e)));
  };
};

export const removerCategoria = (id, loja, cb) => {
  return (dispatch) => {
    axios
      .delete(
        `${api}/${versao}/api/categorias/${id}?loja=${loja}`,
        getHeaders()
      )
      .then((response) => {
        dispatch({ type: REMOVER_CATEGORIA, payload: response.data });
        cb(null);
      })
      .catch((e) => cb(errorHandling(e)));
  };
};
