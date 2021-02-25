import React, { useEffect, useState } from "react";
import Titulo from "../../components/Texto/Titulo";
import Pesquisa from "../../components/Inputs/Pesquisa";
import Tabela from "../../components/Tabela/Simples";
import Dashboard from "../Base";
import Paginacao from "../../components/Paginacao/Simples";
import { useSelector, useDispatch } from "react-redux";
import { getProdutos, getProdutosPesquisa, limparProduto } from "../../actions/produtos";
import { Link } from "react-router-dom";
function Produtos() {
  const dispatch = useDispatch();

  const usuario = useSelector((state) => state.auth.usuario);
  const produtos = useSelector((state) => state.produto.produtos);

  const [limite, setLimite] = useState(6);
  const [ordem, setOrdem] = useState(null);
  const [pesquisa, setPesquisa] = useState("");
  const [atual, setAtual] = useState(0);

  const changeNumeroAtual = (nAtual) => {
    setAtual(nAtual);
  };
  
 
  useEffect(()=>{
    dispatch(limparProduto())
  },[])
  const carregarProdutos = () => {
    if (!usuario) return null;
    if (pesquisa)
      dispatch(
        getProdutosPesquisa(pesquisa, atual, limite, usuario.loja, ordem)
      );
    else dispatch(getProdutos(ordem, atual, limite, usuario.loja));
  };
  const handlePesquisa = () => {
    setAtual(0);
    carregarProdutos();
  };

  const changeOrdem = (e) => {
    setOrdem(e.target.value);
    carregarProdutos();
  };

  useEffect(() => {
    carregarProdutos();
  }, [atual, ordem]);


  const renderBotaoNovo = () => {
    return(
      <Link to="/produtos/novo" className="button button-success button-small">
        <i className="fas fa-plus"></i>
        <small>&nbsp;Novo Produto</small>
      </Link>
    )
  }

  const dados = [];
  (produtos ? produtos.docs : []).forEach((item) => {
    dados.push({
      Produto: item.titulo,
      Categoria: item.categoria ? item.categoria.nome : "",
      Disponível: item.disponibilidade ? "sim" : "não",
      botaoDetalhes: `/produto/${item._id}`,
    });
  });
  return (
    <Dashboard>
      <div className="Produtos full-width">
        <div className="Card">
          <Titulo tipo="h1" titulo="Produtos" />
          <br />
          {renderBotaoNovo()}
          <br/>
          <br/>
          <br/>
          <div className="flex">
            <div className="flex-3">
              <Pesquisa
                valor={pesquisa}
                placeholder={
                  "Pesquise aqui pelo nome do produto, descrição ou categoria..."
                }
                onChange={(e) => setPesquisa(e.target.value)}
                onClick={handlePesquisa}
              />
            </div>
            <div className="flex-1 flex vertical">
              <label>
                <small>Ordenar por</small>
              </label>
              <select value={ordem} onChange={changeOrdem}>
                <option value={""}>Aleatório</option>
                <option value={"alfabetica_a-z"}>Alfabética A-Z</option>
                <option value={"alfabetica_z-a"}>Alfabética Z-A</option>
                <option value={"preco-crescente"}>Preço Menor</option>
                <option value={"preco-decrescente"}>Preço Maior</option>
              </select>
            </div>
            <div className="flex-1"></div>
          </div>
          <br />
          <Tabela
            cabecalho={["Produto", "Categoria", "Disponivel"]}
            dados={dados}
          />
          <Paginacao
            atual={atual}
            total={produtos ? produtos.total : 0}
            limite={limite}
            onClick={(numeroAtual) => changeNumeroAtual(numeroAtual)}
          />
        </div>
      </div>
    </Dashboard>
  );
}

export default Produtos;
