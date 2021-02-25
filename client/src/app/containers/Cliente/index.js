import React, { useEffect } from "react";
import Dashboard from "../Base";

import DetalhesDoCliente from "./DetalhesDoCliente";
import DetalhesDosPedidos from "./DetalhesDosPedidos";

import { useSelector, useDispatch } from "react-redux";
import { getClientId, limparCliente } from "../../actions/clientes";

function Cliente(props) {
  const id = props.match.params.id;
  const usuario = useSelector((state) => state.auth.usuario);
  const cliente = useSelector(state => state.cliente.cliente)

    console.log("cliente", cliente && cliente.nome)

  
  const dispatch = useDispatch();
  useEffect(() => {
    if (!usuario) return null;
    dispatch(getClientId(id, usuario.loja));

    
  }, []);

  useEffect(() => {
    dispatch(limparCliente());
  }, []);

  const working = () => {
    if(!cliente) return null
    return (
      <div className="Cliente full-width flex vertical">
        <div className="Card">
          <DetalhesDoCliente clientela={cliente} history={props.history}/>
        </div>
        <div className="Sub-Card">
          <DetalhesDosPedidos id={id} />
        </div>
      </div>
    )
  }
  return (
    <Dashboard>
        {working()}
    </Dashboard>
  );
}

export default Cliente;
