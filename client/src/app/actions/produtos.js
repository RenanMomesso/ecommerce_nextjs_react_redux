import { api, versao } from "../config";
import { getHeaders } from "./localStorage";
import axios from "axios";
import errorHandling from "./errorHandling";
import {
  GET_PRODUTOS,
  GET_PRODUTO,
  SALVAR_PRODUTO,
  LIMPAR_PRODUTOS,
  REMOVER_PRODUTO,
  EDITAR_PRODUTOS,
} from "./types";

export const getProdutos = (ordem, atual, limite, loja) => {
  return (dispatch) => {
    axios.get(`${api}/${versao}/api/produtos?offset=${atual}&limit=${limite}&loja=${loja}&sortType=${ordem}`, getHeaders())
      .then((response) =>
        dispatch({ type: GET_PRODUTOS, payload: response.data })
      )
      .catch(errorHandling);
  };
};

export const getProdutosPesquisa = (nome, offset, limit, loja, ordem) => {
  return (dispatch) => {
    axios
      .get(
        `${api}/${versao}/api/produtos/search/${nome}?loja=${loja}&offset=${offset}&limit=${limit}&sortType=${ordem}`,
        getHeaders()
      )
      .then((response) =>
        dispatch({ type: GET_PRODUTOS, payload: response.data })
      )
      .catch(errorHandling);
  };
};

export const salvarProduto = (produto, loja, cb) => {
  return function(dispatch){
      axios.post(`${api}/${versao}/api/produtos?loja=${loja}`, {
          titulo: produto.nome,
          descricao: produto.descricao,
          categoria: produto.categoria,
          preco: produto.preco,
          promocao: produto.promocao,
          sku: produto.sku
      }, getHeaders())
      .then(response => {
          dispatch({ type: GET_PRODUTO, payload: response.data });
          cb(null);
      })
      .catch((e) => cb(errorHandling(e)));
  }
}


export const getProduto = (id, loja) => {
  return dispatch => {
    axios.get(`${api}/${versao}/api/produtos/${id}?loja=${loja}`,getHeaders())
    .then(response => dispatch({type:GET_PRODUTO, payload:response.data}))
    .catch(errorHandling)
  }
}

export const limparProduto = () => ({type:LIMPAR_PRODUTOS})

export const updateProduto = (produto, id, loja, cb) => {
  return function(dispatch){
      axios.put(`${api}/${versao}/api/produtos/${id}?loja=${loja}`, {
          titulo: produto.nome,
          descricao: produto.descricao,
          disponibilidade: produto.disponibilidade === "disponivel" ? "true" : "false",
          categoria: produto.categoria,
          preco: produto.preco,
          promocao: produto.promocao,
          sku: produto.sku
      }, getHeaders())
      .then(response => {
          dispatch({ type: GET_PRODUTO, payload: response.data });
          cb(null);
      })
      .catch(e => cb(errorHandling(e)));
  }
}


export const removeProdutoImagens = (fotos, id, loja, cb) => {
  return dispatch => {
    axios.put(`${api}/${versao}/api/produtos/${id}?loja=${loja}`, {fotos}, getHeaders())
    .then(response =>
      {
        dispatch({
          type:GET_PRODUTO,
          payload:response.data
        })
      }
      )
    .catch(e=>cb(errorHandling(e)))
  }
}

export const updateProdutoImagens = (data, id, loja, cb)=> {
  return dispatch => {
    axios.put(`${api}/${versao}/api/produtos/images/${id}?loja=${loja}`, data, getHeaders())
    .then(response => {
      dispatch({
        type:GET_PRODUTO,
        payload:response.data
      })
      cb(null)
    }).catch(e => cb(errorHandling(e)))
  }
}