import React, {useEffect} from "react";
import Dashboard from "../Base";

import DetalhesProdutos from "./detalhesProdutos";
import DetalhesVariacoes from "./detalhesVariacoes";

import { useDispatch, useSelector } from "react-redux";
import { getProduto, limparProduto } from "../../actions/produtos";
import { getCategorias } from "../../actions/categorias";


const Produto = (props) => {

  const dispatch = useDispatch();
  const usuarios = useSelector((state) => state.auth.usuario);
  const produto = useSelector(state => state.produto.produto)

  useEffect(()=>{
    if(!usuarios) return null;
    const id = props.match.params.id
    dispatch(getProduto(id,usuarios.loja))
    dispatch(getCategorias(usuarios.loja))
  },[])

  const getProductInformation = () => {
    if(!produto) return <div>Não há produto a ser mostrado !</div>
    return ( 
      <div className="Produto full-width flex vertical">
        <div className="Card">
          <DetalhesProdutos history={props.history} produto={produto}  />
        </div>
        <div className="Sub-Card flex-8">
          <DetalhesVariacoes />
        </div>
      </div>
    )
  }

  return (
    <Dashboard>
      {getProductInformation()}
    </Dashboard>
  );
};

export default Produto;
