import React, { useState } from "react";
import Titulo from "../../components/Texto/Titulo";
import ListaDinamica from "../../components/Listas/ListaDinamicaSimples";
import { useSelector, useDispatch } from "react-redux";
import AlertGeral from "../../components/Alert/Geral";
import { setNovoStatusPagamento } from "../../actions/pedidos";

// import { Container } from './styles';

function DetalhesDoPagamento() {
  const usuario = useSelector((state) => state.auth.usuario);
  const pedido = useSelector((state) => state.pedido.pedido);
  const dispatch = useDispatch();

  const [aviso, setAviso] = useState(null);

  // const onRemoveListaDinamica = (index) => {
  //   const statuse = status.filter((item, _index) => _index !== index);
  //    setStatus(statuse);
  //  };
  

  const onAddListaDinamica = (texto) => {
    setAviso(null)
    if (!texto)
      setAviso({
        aviso: false,
        msg: "Preencha o campo para enviar um novo estatus.",
      });
    dispatch(
      setNovoStatusPagamento(
        texto,
        pedido.pedido.pagamento._id,
        pedido.pedido._id,
        usuario.loja,
        (error) => {
          if (error) return null;
        }
      )
    );
  };
  const mudarEstatus = () => {
    const status = (pedido.registros || []).reduce(
      (all, item) =>
        item.tipo === "pagamento" ? all.concat([item.situacao]) : all,
      []
    );
    return (
      <div className="Detalhes-do-Pagamento">
        <Titulo tipo="h3" titulo="Pagamento" />
        <AlertGeral aviso={aviso} />
        <br />
        <ListaDinamica
          dados={status}
          // onRemove={onRemoveListaDinamica}
          onAdd={onAddListaDinamica}
        />
      </div>
    );
  };

  if (!pedido) return <div></div>;
  return(
    <div>
      {mudarEstatus()}
    </div>
  )
}

export default DetalhesDoPagamento;
