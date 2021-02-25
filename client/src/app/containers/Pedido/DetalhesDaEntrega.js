import React, { useState } from "react";

import Titulo from "../../components/Texto/Titulo";
import ListaDinamica from "../../components/Listas/ListaDinamicaSimples";
import InputValor from "../../components/Inputs/InputValor";

import { useSelector, useDispatch } from "react-redux";
import { setNovoStatusEntrega } from "../../actions/pedidos";

import AlertGeral from '../../components/Alert/Geral'

function DetalhesDaEntrega() {
  const dispatch = useDispatch();
  const usuario = useSelector((state) => state.auth.usuario);
  const pedido = useSelector((state) => state.pedido.pedido);

  const [codigoDeRastreamento, setCodigoDeRastreamento] = useState("AAAA123");
  const [aviso, setAviso] = useState(null);
  const [status, setStatus] = useState([
    "Preparando para envio",
    "Entregue para a transportadora",
    "Em trânsito",
  ]);

  //const onRemoveListaDinamica = (index) => {
  //   const statuse = status.filter((item, _index) => _index !== index);
  //    setStatus(statuse);
  //  };

  const onAddListaDinamica = (texto) => {
    if (!texto)
      setAviso({
        aviso: false,
        msg: "Preencha o campo para enviar um novo estatus.",
      });
    setNovoStatus(texto, undefined);
  };

  const handleSubmit = (value) => {
    if (!value)
      return setAviso({
        status: false,
        msg: "Preencha o código de rastreamento corretamente.",
      });
    setNovoStatus("Atualização no Cód. de Rastreamento", value);
  };

  const setNovoStatus = (status, codigoRastreamento) => {
    setAviso(null);
    if (!usuario || !pedido) return false;
    dispatch(
      setNovoStatusEntrega(
        { status, codigoRastreamento },
        pedido.pedido.entrega._id,
        pedido.pedido._id,
        usuario.loja,
        (error) => {
          if (error) setAviso({ aviso: false, msg: error.message });
        }
      )
    );
  };

  if (!pedido) return <div></div>;

  const mudarEstatus = () => {
    const status = (pedido.registros || []).reduce(
      (all, item) =>
        item.tipo === "entrega" ? all.concat([item.situacao]) : all,
      []
    );
    const { codigoRastreamento } = pedido.pedido.entrega;

    return (
      <div className="Detalhes-do-Entrega">
        <Titulo tipo="h3" titulo="Entrega" />
        <AlertGeral aviso={aviso} />
        <br />
        <label>Código de Rastreamento</label>
        <InputValor
          value={codigoRastreamento}
          handleSubmit={(value) => handleSubmit(value)}
          name={"codigoRastreamento"}
        />
        <br />
        <ListaDinamica
          dados={status}
          // onRemove={onRemoveListaDinamica}
          onAdd={onAddListaDinamica}
        />
      </div>
    );
  };

  return mudarEstatus();
}

export default DetalhesDaEntrega;
