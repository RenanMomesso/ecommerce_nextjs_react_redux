import React, { useState } from "react";
import ButtonSimples from "../../components/Button/Simples";
import TabelaSimples from "../../components/Tabela/Simples";
import { TextoDados } from "../../components/Texto/Dados";

import Titulo from "../../components/Texto/Titulo";

import { useDispatch, useSelector } from "react-redux";

import moment from "moment";
import { formatMoney } from "../../actions";

import AlertGeral from "../../components/Alert/Geral";
import { cancelarPedido } from "../../actions/pedidos";

function DetalhesDoPedido() {
  const usuario = useSelector((state) => state.auth.usuario);
  const pedido = useSelector((state) => state.pedido.pedido);

  console.log("pedido", pedido)

  const dispatch = useDispatch();

  const [aviso, setAviso] = useState(null);

  const cancelarButtonPedido = () => {
    if (!usuario || !pedido) return null;
    if (window.confirm("Você realmente deseja cancelar este pedido?")) {
      dispatch(
        cancelarPedido(pedido.pedido._id, usuario.loja, (error) => {
          setAviso({ status: !error, msg: error ? error.message : "Pedido cancelado com sucesso." });
        })
      );
    }
  };

  const cabecalho = () => {
    if (!pedido) return null;
    return (
      <div className="flex">
        <div className="flex-1 flex">
          <Titulo
            tipo="h2"
            titulo={`Pedido - ${
              pedido.pedido.cliente ? pedido.pedido.cliente.nome : ""
            } - ${moment(pedido.pedido.createdAt).format("DD/MM/YYYY")}`}
          />
        </div>
        <div className="flex-1 flex flex-end">
          {pedido.pedido.cancelado ? (
            <ButtonSimples type="danger" label="CANCELADO" />
          ) : (
            <ButtonSimples
              type="danger"
              label="CANCELAR PEDIDO"
              onClick={() => cancelarButtonPedido()}
            />
          )}
        </div>
      </div>
    );
  };

  const DadosDoCliente = () => {
    if (!pedido) return null;
    return (
      <div className="flex-2">
        <Titulo tipo="h4" titulo="Dados do Cliente" />
        <br />
        <TextoDados
          chave="Nome"
          valor={pedido.pedido ? pedido.pedido.cliente.nome : null}
        />
        <TextoDados
          chave="CPF"
          valor={pedido.pedido ? pedido.pedido.cliente.cpf : null}
        />
        <TextoDados
          chave="Telefone"
          valor={pedido.pedido ? pedido.pedido.cliente.telefones[0] : null}
        />
        <TextoDados
          chave="Data de nascimento"
          valor={
            pedido.pedido
              ? moment(pedido.pedido.cliente.dataDeNascimento).format(
                  "DD/MM/YYYY"
                )
              : null
          }
        />
      </div>
    );
  };
  const DadosDeEntrega = () => {
    if (!pedido) return null;
    return (
      <div className="flex-2">
        <Titulo tipo="h4" titulo="Dados de entrega" />
        <br />
        <TextoDados
          chave="Endereco"
          valor={pedido.pedido ? pedido.pedido.cliente.endereco.local : ""}
        />
        <TextoDados
          chave="Bairro"
          valor={pedido.pedido ? pedido.pedido.cliente.endereco.bairro : ""}
        />
        <TextoDados
          chave="Cidade"
          valor={pedido.pedido ? pedido.pedido.cliente.endereco.cidade : ""}
        />
        <TextoDados
          chave="Estado"
          valor={pedido.pedido ? pedido.pedido.cliente.endereco.estado : ""}
        />
        <TextoDados
          chave="CEP"
          valor={pedido.pedido ? pedido.pedido.cliente.endereco.CEP : ""}
        />
      </div>
    );
  };

  const DadosDePagamento = () => {
    if (!pedido) return null;
    const { entrega, pagamento } = pedido.pedido;
    return (
      <div className="flex-3">
        <Titulo tipo="h4" titulo="Dados de pagamento" />
        <br />
        <TextoDados
          chave="Taxa de entrega"
          valor={`${formatMoney(entrega.custo)} (${entrega.tipo})`}
        />
        <TextoDados
          chave="Valor do pedido"
          valor={`${formatMoney(pagamento.valor - entrega.custo)}`}
        />
        <TextoDados chave="Valor total" valor={`${pagamento.valor}`} />
        <TextoDados chave="Forma de pagamento" valor={pagamento.forma} />
      </div>
    );
  };

  const DadosDoCarrinho = () => {
    if (!pedido) return null;
    const { carrinho } = pedido.pedido;

    const dados = [];
    carrinho.forEach((item) => {
      dados.push({
        Produto: item.produto.titulo + " - " + item.variacao.nome,
        "Preço Und.": formatMoney(item.precoUnitario),
        Quantidade: item.quantidade,
        "Preço Total": formatMoney(item.precoUnitario * item.quantidade),
      });
    });

    return (
      <div className="flex-3">
        <Titulo tipo="h4" titulo="Carrinho" />
        <br />
        <TabelaSimples
          cabecalho={["Produto", "Preço Und.", "Quantidade", "Preço Total"]}
          dados={dados}
        />
      </div>
    );
  };

  return (
    <div className="Detalhes-do-Pedido">
      {cabecalho()}
      <AlertGeral aviso={aviso} />
      <div className="flex vertical">
        <div className="flex horizontal">
          {DadosDoCliente()}
          {DadosDoCarrinho()}
        </div>
        <div className="flex horizontal">
          {DadosDeEntrega()}
          {DadosDePagamento()}
        </div>
      </div>
    </div>
  );
}

export default DetalhesDoPedido;
