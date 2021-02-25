import React, { useEffect } from "react";
import { getCategoria, limparCategorias } from "../../actions/categorias";
import Dashboard from "../Base";

import DetalhesCategoria from "./detalhesCategoria";
import ListaDeProdutos from "./ListaDeProdutos";

import { useSelector, useDispatch } from "react-redux";
const Categoria = (props) => {
  const id = props.match.params.id;
  const usuario = useSelector((state) => state.auth.usuario);
  const categoria = useSelector(state => state.categoria.categoria)
  const dispatch = useDispatch();

  useEffect(() => {
    if (!usuario || !id) return null;
    dispatch(getCategoria(id, usuario.loja));
  }, []);

  useEffect(() => {
    dispatch(limparCategorias());
  }, []);

  const categoriaToProps = () => {
    if(!categoria) return null
    return(
      <div className="Categoria full-width">
        <div className="Card">
          <div>
            <DetalhesCategoria history={props.history} categoria={categoria} />
          </div>
          <div>
            <ListaDeProdutos categoria={categoria} />
          </div>
        </div>
      </div>
    )
  }

  return (
    <Dashboard>
        {categoriaToProps()}
    </Dashboard>
  );
};

export default Categoria;
