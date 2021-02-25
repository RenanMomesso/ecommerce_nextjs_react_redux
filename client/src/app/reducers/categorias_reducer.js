const {
  GET_CATEGORIAS,
  GET_CATEGORIA,
  LIMPAR_CATEGORIAS,
  REMOVER_CATEGORIA,
  GET_CATEGORIAS_PRODUTOS,
} = require("../actions/types");

export default (state = {}, action) => {
  switch (action.type) {
    case GET_CATEGORIAS:
      return { ...state, categorias: action.payload.categorias };
    case GET_CATEGORIA:
      return { ...state, categoria: action.payload.categoria };
    case LIMPAR_CATEGORIAS:
    case REMOVER_CATEGORIA:
      return { ...state, categoria: null };
    case GET_CATEGORIAS_PRODUTOS:
      return { ...state, categoriaProdutos: action.payload.produtos };
    default:
      return state;
  }
};
