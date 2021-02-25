import {
  GET_PEDIDOS,
  CANCELAR_PEDIDO,
  GET_PEDIDO,
  LIMPAR_PEDIDOS,
  LOGIN_USER,
  LOGOUT_USER,
} from "../actions/types";

export default (state = {}, action) => {
  switch (action.type) {
    case GET_PEDIDOS:
      return { ...state, pedidos: action.payload.pedidos };
    case GET_PEDIDO:
      return { ...state, pedido: action.payload };
    case LIMPAR_PEDIDOS:
      return { ...state, pedido: null };
    case CANCELAR_PEDIDO:
      return {
        ...state,
        pedido: {
          ...state.pedido,
          pedido: {
            ...state.pedido.pedido,
            cancelado: action.payload.cancelado,
          },
        },
      };
    default:
      return state;
  }
};
