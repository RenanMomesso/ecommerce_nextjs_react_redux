import { getHeaders } from "./localStorage";
import axios from "axios";
import { api, versao } from "../config";
import errorHandling from "./errorHandling";
import {
  GET_CLIENTES,
  GET_CLIENT,
  LIMPAR_CLIENTES,
  REMOVE_CLIENT,
  GET_CLIENTE_PEDIDOS,
} from "./types";
import { transformDate } from "./index";

export const getClientes = (atual, limite, loja) => {
  return (dispatch) => {
    axios
      .get(
        `${api}/${versao}/api/clientes?offset=${atual}&limit=${limite}&loja=${loja}`,
        getHeaders()
      )
      .then((response) =>
        dispatch({
          type: GET_CLIENTES,
          payload: response.data,
        })
      )
      .catch(errorHandling);
  };
};

export const getClientesPesquisa = (termo, atual, limite, loja) => {
  return (dispatch) => {
    axios
      .get(
        `${api}/${versao}/api/clientes/search/${termo}?offset=${atual}&limit=${limite}&loja=${loja}`,
        getHeaders()
      )
      .then((response) =>
        dispatch({
          type: GET_CLIENTES,
          payload: response.data,
        })
      )
      .catch(errorHandling);
  };
};

export const getClientId = (id, loja) => {
  return (dispatch) => {
    axios.get(`${api}/${versao}/api/clientes/admin/${id}?loja=${loja}`,getHeaders())
      .then((response) =>
       dispatch({
          type: GET_CLIENT,
          payload: response.data,
        })
      )
      .catch(errorHandling);
  };
};

export const limparCliente = () => ({ type: LIMPAR_CLIENTES });

export const getClientePedidos = (id, atual, limit, loja) => {
  return (dispatch) => {
    axios
      .get(
        `${api}/${versao}/api/clientes/admin/${id}/pedidos?loja=${loja}&offset=${atual}&limit=${limit}`,
        getHeaders()
      )
      .then((response) =>
        dispatch({
          type: GET_CLIENTE_PEDIDOS,
          payload: response.data,
        })
      )
      .catch(errorHandling);
  };
};

export const updateCliente = (cliente, id, loja, cb) => {
  return function(dispatch){
      axios.put(`${api}/${versao}/api/clientes/admin/${id}?loja=${loja}`, {
          nome: cliente.nome,
          cpf: cliente.CPF,
          email: cliente.email,
          telefones: [cliente.telefone],
          endereco: {
              local: cliente.endereco,
              numero: cliente.numero,
              bairro: cliente.bairro,
              cidade: cliente.cidade,
              estado: cliente.estado,
              CEP: cliente.cep
          },
          dataDeNascimento: transformDate(cliente.dataDeNascimento, "/", "YYYY-MM-DD")
      }, getHeaders())
      .then(response => {
          dispatch({ type: GET_CLIENT, payload: response.data });
          cb(null);
      })
      .catch((e) => cb(errorHandling(e)))
  }
}

export const removerClientes = (id, loja, cb) => {
  return (dispatch) => {
    axios
      .delete(
        `${api}/${versao}/api/clientes/admin/${id}?loja=${loja}`,

        getHeaders()
      )
      .then((response) => {
        dispatch({
          type: REMOVE_CLIENT,
          payload: response.data,
        });
        cb(null);
      })
      .catch((error) => cb(errorHandling(error)));
  };
};
