import React from "react";

import Variacoes from "./variacoes";
import OpcaoVariacao from "./opcaoVariacao";
import NovaVariacao from './NovaVariacao'
import {useSelector, useDispatch, connect} from 'react-redux'


function DetalhesVariacoes() {

  const variacao = useSelector(state => state.variacao.variacao)
  

  return (
    <div className="Detalhes-variacoes flex">
      <div className="Sub-Card flex-1">
        <Variacoes />
      </div>
      <div className="Sub-Card flex-6">
        {!variacao ? <NovaVariacao/> :  <OpcaoVariacao />}
      </div>
    </div>
  );
}



export default DetalhesVariacoes;
