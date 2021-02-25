import { getHeaders } from "./localStorage";
import axios from "axios";
import { api, versao } from "../config";
import errorHandling from "./errorHandling";
import { GET_PEDIDOS,CANCELAR_PEDIDO,GET_PEDIDO,LIMPAR_PEDIDOS  } from "./types";

export const getPedidos = (atual, limit, loja) => {
  return (dispatch) => {
    axios
      .get(
        `${api}/${versao}/api/pedidos/admin?offset=${atual}&limit=${limit}&loja=${loja}`,
        getHeaders()
      )
      .then((response) => {
        dispatch({
          type: GET_PEDIDOS,
          payload: response.data,
        });
      })
      .catch(errorHandling);
  };
};

export const getPedidosPesquisa = (termo, atual, limit, loja) => {
  return (dispatch) => {
    if (termo)
      axios
        .get(
          `${api}/${versao}/api/clientes/search/${termo}/pedidos?offset=${atual}&limit=${limit}&loja=${loja}`,
          getHeaders()
        )
        .then((response) =>
          dispatch({
            type: GET_PEDIDOS,
            payload: response.data,
          })
        )
        .catch(errorHandling);
  };
};

export const getPedido = (id, loja) => {
  return (dispatch) => {
    axios
      .get(
        `${api}/${versao}/api/pedidos/admin/${id}?loja=${loja}`,
        getHeaders()
      )
      .then((response) =>
        dispatch({
          type: GET_PEDIDO,
          payload: response.data,
        })
      )
      .catch(errorHandling);
  };
};

export const cancelarPedido = (id, loja, cb) => {
  return (dispatch) => {
    axios
      .delete(
        `${api}/${versao}/api/pedidos/admin/${id}?loja=${loja}`,
        getHeaders()
      )
      .then((response) => {
        dispatch({ type: CANCELAR_PEDIDO, payload: response.data });
        cb(null);
      })
      .catch((e) => errorHandling(e));
  };
};

export const limparPedidos = () => ({ type: LIMPAR_PEDIDOS });

export const setNovoStatusPagamento = (status, id, idPedido, loja, cb) => {
  return (dispatch) => {
    axios
      .put(
        `${api}/${versao}/api/pagamentos/${id}?loja=${loja}&pedido=${idPedido}`,
        { status },
        getHeaders()
      )
      .then((response) => {
        console.log(response)
        dispatch(getPedido(idPedido, loja));
        cb(null);
      })
      .catch((e) => errorHandling(e));
  };
};

export const setNovoStatusEntrega = (
  { status, codigoRastreamento },
  id,
  idPedido,
  loja,
  cb
) => {
  return (dispatch) => {
    axios
      .put(
        `${api}/${versao}/api/entregas/${id}?loja=${loja}&pedido=${idPedido}`,
        { status, codigoRastreamento },
        getHeaders()
      )
      .then((response) => {
        dispatch(getPedido(idPedido, loja));
        cb(null);
      })
      .catch((e) => errorHandling(e));
  };
};
