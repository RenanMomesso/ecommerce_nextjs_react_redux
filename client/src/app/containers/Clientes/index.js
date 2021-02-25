import React, { useEffect, useState } from "react";
import Titulo from "../../components/Texto/Titulo";
import Pesquisa from "../../components/Inputs/Pesquisa";
import Tabela from "../../components/Tabela/Simples";
import Dashboard from "../Base";
import Paginacao from "../../components/Paginacao/Simples";
import { useSelector, useDispatch } from "react-redux";
import { getClientes, getClientesPesquisa, limparCliente } from "../../actions/clientes";


function Clientes() {
  const dispatch = useDispatch();

  const todosClientes = useSelector((state) => state.cliente.clientes);
  const usuario = useSelector((state) => state.auth.usuario);

  const [limite, setlimit] = useState(5);
  const [pesquisa, setPesquisa] = useState("");
  const [atual, setAtual] = useState(0);

  const changeNumeroAtual = (nAtual) => {
    setAtual(nAtual);
  };

  useEffect(()=>{
    dispatch(limparCliente())
  },[])

  const getAllClientes = () => {
    if (!usuario) return null;
    if (pesquisa) dispatch(getClientesPesquisa(pesquisa, atual, limite, usuario.loja));
    else dispatch(getClientes(atual, limite, usuario.loja));
  };

  useEffect(() => {
    getAllClientes();
  }, [atual]);

  const dadioS = [];
  (todosClientes ? todosClientes.docs : []).forEach((item) => {
    dadioS.push({
      Cliente: item.nome,
      "E-mail": item.usuario ? item.usuario.email : "",
      Telefone: item.telefones[0],
      CPF: item.cpf,
      botaoDetalhes: `/cliente/${item._id}`,
    });
  });

  const submitPesquisa = () => {
    setAtual(0);
    getAllClientes();
  };

  return (
    <Dashboard>
      <div className="Clientes full-width">
        <div className="Card">
          <Titulo tipo="h1" titulo="Clientes" />
          <br />
          <Pesquisa
            valor={pesquisa}
            placeholder={"Pesquise aqui"}
            onChange={(e) => setPesquisa(e.target.value)}
            onClick={submitPesquisa}
          />
          <br />
          <Tabela
            cabecalho={["Cliente", "E-mail", "Telefone", "CPF"]}
            dados={dadioS}
          />
          <Paginacao
            atual={atual}
            total={todosClientes ? todosClientes.total : 0}
            limite={limite}
            onClick={(numeroAtual) => changeNumeroAtual(numeroAtual)}
          />
        </div>
      </div>
      );
    </Dashboard>
  );
}

export default Clientes;
