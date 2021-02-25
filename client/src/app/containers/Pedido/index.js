import React, { useEffect } from "react";

import DetalhesDoPedido from "./DetalhesDoPedido";
import DetalhesDaEntrega from "./DetalhesDaEntrega";
import DetalhesDoPagamento from "./DetalhesDoPagamento";

import Voltar from '../../components/Links/Voltar'

import Base from "../Base";

import { useSelector, useDispatch} from 'react-redux'
import { getPedido, limparPedidos } from "../../actions/pedidos";



const Pedido = (props) => {

const dispatch = useDispatch();
const usuario = useSelector(state => state.auth.usuario)
const id = props.match.params.id
const loja = usuario.loja

useEffect(()=>{
  dispatch(getPedido(id,loja))
},[])

useEffect(() => {
  dispatch(limparPedidos())
},[])

  return (
   <Base>
      <div className="Pedidos full-width flex vertical">
        <div className="Card">
         <Voltar history={props.history}/>
          <DetalhesDoPedido />
        </div>

        <div className="flex horizontal">
          <div className="Sub-Card flex-1 flex vertical">
            <DetalhesDaEntrega />
          </div>
          <div className="Sub-Card flex-1 flex vertical">
            <DetalhesDoPagamento />
          </div>
        </div>
      </div>
   </Base>
    
  );
};

export default Pedido;
