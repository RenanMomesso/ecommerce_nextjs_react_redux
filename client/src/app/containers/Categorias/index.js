import React, { useEffect, useState } from "react";
import Titulo from "../../components/Texto/Titulo";
import Tabela from "../../components/Tabela/Simples";
import Dashboard from "../Base";

import {Link} from 'react-router-dom'

import {useDispatch, useSelector} from 'react-redux';
import { getCategorias } from "../../actions/categorias";

function Categorias() {

  const dispatch = useDispatch()
  const categorias = useSelector(state => state.categoria.categorias);
  const usuario = useSelector(state => state.auth.usuario)
  


  const getCategoriasChamada = () => {
    if(!usuario) return null;
    dispatch(getCategorias(usuario.loja))
  }

  console.log(categorias)

  useEffect(()=>{
    getCategoriasChamada()
  },[])

 

  const renderBotaoNovo = () => {
    return (
      <Link to="/categorias/nova" className="button button-success button-small">
        <i className="fas fa-plus"></i>
        <span>&nbsp; Nova Categoria</span>
      </Link>
    )
  }

 const dados = [];
 (categorias || []).forEach((item) => {
   dados.push({
     "Categoria":item.nome,
     "Qtd. de Produtos":item.produtos.length,
     "botaoDetalhes":`/categoria/${item._id}`
   })
 })

  return (
    <Dashboard>
      <div className="Clientes full-width">
        <div className="Card">
          <Titulo tipo="h1" titulo="Categorias" />
          <br />
         {renderBotaoNovo()}
          <br />
          <Tabela cabecalho={["Categoria", "Qtd. de Produtos"]} dados={dados} />
         
        </div>
      </div>
    </Dashboard>
  );
}

export default Categorias;
