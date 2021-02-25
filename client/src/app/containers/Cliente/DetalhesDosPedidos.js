import React, { useState, useEffect } from "react";
import Titulo from "../../components/Texto/Titulo";
import Tabela from "../../components/Tabela/Simples";
import moment from "moment";

import { useSelector, useDispatch } from "react-redux";
import Paginacao from "../../components/Paginacao/Simples";
import { getClientePedidos } from "../../actions/clientes";
import { formatMoney } from "../../actions";

function DetalhesDosPedidos(props) {
  const [atual, setAtual] = useState(0);
  const [limite, setLimite] = useState(6);

  const usuario = useSelector((state) => state.auth.usuario);
  const clientePedidos = useSelector((state) => state.cliente.clientePedidos);

  const dispatch = useDispatch();

  const getPedidos = () => {
    if (!usuario || !props.id) return null;
    else dispatch(getClientePedidos(props.id, atual, limite, usuario.loja));
  };

  useEffect(() => {
    getPedidos();
  }, [atual]);

  const changeNumeroAtual = (numero) => {
    setAtual(numero);
  };

  if (!clientePedidos) return <div>Sem Pedidos</div>;
  const dados = [];
  (clientePedidos ? clientePedidos.docs : []).forEach((item) => {
    dados.push({
      ID: item._id,
      "Valor Total": formatMoney(item.pagamento.valor),
      Data: moment(item.createdAt).format("DD/MM/YYYY"),
      Situação: `${item.pagamento.status || "-"} / ${
        item.entrega.status || "-"
      }`,
      botaoDetalhes: `/pedido/${item._id}`,
    });
  });

  return (
    <div className="Detalhes-dos-Pedidos">
      <Titulo tipo="h2" titulo="Pedidos feitos" />
      <br />
      <br />
      <Tabela
        cabecalho={["ID", "Valor Total", "Data", "Situação"]}
        dados={dados}
      />
      <Paginacao
        atual={atual}
        total={clientePedidos ? clientePedidos.total : 0}
        limite={limite}
        onClick={(numeroAtual) => changeNumeroAtual(numeroAtual)}
      />
    </div>
  );
}

export default DetalhesDosPedidos;
