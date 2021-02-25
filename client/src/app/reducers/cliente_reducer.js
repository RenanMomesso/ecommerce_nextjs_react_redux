import {
  GET_CLIENTES,
  LIMPAR_CLIENTES,
  GET_CLIENT,
  GET_CLIENTE_PEDIDOS,
  REMOVE_CLIENT,
} from "../actions/types";

export default (state = {}, action) => {
  switch (action.type) {
    case GET_CLIENTES:
      return {
        ...state,
        clientes: action.payload.clientes,
      };
    case GET_CLIENT:
      console.log(GET_CLIENT)
      return { ...state, cliente: action.payload.cliente };
     
    case LIMPAR_CLIENTES:
      return { ...state, cliente: null };
    case GET_CLIENTE_PEDIDOS:
      return { ...state, clientePedidos: action.payload.pedidos };
    case REMOVE_CLIENT:
      return {
        ...state,
        cliente: { ...state.cliente, deletado: action.payload.deletado },
      };
    default:
      return state;
  }
};
