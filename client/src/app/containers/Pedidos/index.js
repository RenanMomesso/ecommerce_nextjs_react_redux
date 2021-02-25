import React, { useState, useEffect } from "react";
import Titulo from "../../components/Texto/Titulo";
import Pesquisa from "../../components/Inputs/Pesquisa";
import Tabela from "../../components/Tabela/Simples";
import Dashboard from "../Base";
import moment from "moment";
import Paginacao from "../../components/Paginacao/Simples";
import { useDispatch, useSelector } from "react-redux";
import { getPedidos, getPedidosPesquisa } from "../../actions/pedidos";
import { formatMoney } from "../../actions";

function Pedidos() {
  const dispatch = useDispatch();

  const [pesquisa, setPesquisa] = useState("");
  const [atual, setAtual] = useState(0);
  const [limit, setLimit] = useState(5);

  const usuarios = useSelector((state) => state.auth.usuario);
  const pedidosTotal = useSelector((state) => state.pedido.pedidos);

  const loja = usuarios.loja;

  const carregarPedidos = () => {
    if (!usuarios) return null;
    if (pesquisa) dispatch(getPedidosPesquisa(pesquisa, atual, limit, loja));
    else dispatch(getPedidos(atual, limit, loja));
  };

  const pedidos = useSelector(state => state.categoria)
  
  useEffect(() => {
    carregarPedidos();
  }, [atual]);

  const dados = [];
  (pedidosTotal ? pedidosTotal.docs : []).forEach((item) => {
    dados.push({
      Cliente: item.cliente ? item.cliente.nome : "",
      "Valor Total": formatMoney(item.pagamento.valor),
      Data: moment(item.createdAt).format("DD/MM/YYYY"),
      Situação:
        item.pagamento.status !== "Paga"
          ? item.pagamento.status
          : item.entrega.status,
      botaoDetalhes: `/pedido/${item._id}`,
    });
  });

  const handleSubmitPesquisa = () => {
    setAtual(0);
    carregarPedidos();
  };

  const changeNumeroAtual = (nAtual) => {
    console.log(atual);
    setAtual(nAtual);
    carregarPedidos();
  };

  return (
    <Dashboard>
      {JSON.stringify(pedidos)}
      <div className="Pedidos full-width">
        <div className="Card">
          <Titulo tipo="h1" titulo="Pedidos" />
          <br />
          <Pesquisa
            valor={pesquisa}
            placeholder={"Pesquise aqui"}
            onChange={(e) => setPesquisa(e.target.value)}
            onClick={handleSubmitPesquisa}
          />
          <br />
          <Tabela
            cabecalho={["Cliente", "Valor Total", "Data", "Situação"]}
            dados={dados}
          />
          <Paginacao
            atual={atual}
            //consertar isto aqui de
            total={pedidosTotal ? pedidosTotal.total : 0}
            limite={limit}
            onClick={(atual) => changeNumeroAtual(atual)}
          />
        </div>
      </div>
    </Dashboard>
  );
}

export default Pedidos;
