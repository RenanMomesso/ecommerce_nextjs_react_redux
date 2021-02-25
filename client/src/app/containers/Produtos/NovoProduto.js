import React, { useState, useEffect } from "react";
import ButtonSimples from "../../components/Button/Simples";
import Select from "../../components/Inputs/Select";
import InputSimples from "../../components/Inputs/Simples";
import Voltar from "../../components/Links/Voltar";
import { TextoDados } from "../../components/Texto/Dados";
import Titulo from "../../components/Texto/Titulo";
import { useSelector, useDispatch } from "react-redux";
import AlertGeral from "../../components/Alert/Geral";
import { getCategorias } from "../../actions/categorias";
import Dashboard from "../Base";
import { novoProduto, salvarProduto } from "../../actions/produtos";

export default (props) => {
  const dispatch = useDispatch();

  const produto = useSelector((state) => state.produto.produto);
  const categorias = useSelector((state) => state.categoria.categorias);
  const usuario = useSelector((state) => state.auth.usuario);

  const carregarCategorias = () => {
    if (!usuario) return null;
    dispatch(getCategorias(usuario.loja));
  };

  useEffect(() => {
    carregarCategorias();
  }, []);

  const [aviso, setAviso] = useState();
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [categoria, setCategoria] = useState("");
  const [preco, setPreco] = useState(0);
  const [sku, setSku] = useState("");
  const [promocao, setPromocao] = useState("");
  const [erros, setErros] = useState({});

  const validate = () => {
    const errado = {};

    if (!nome) errado.nome = "Preencha aqui com o nome do produto";
    if (!categoria)
      errado.categoria = "Preencha aqui com a categoria do produto";
    if (!descricao)
      errado.descricao = "Preencha aqui com a descrição do produto";
    if (!preco) errado.preco = "Preencha aqui com o preço do produto";
    if (!promocao)
      errado.promocao = "Preencha aqui com o preço de promoção do produto";
    if (!sku) errado.sku = "Preencha aqui com o SKU do produto";

    setErros(errado);
    return !(Object.keys(errado).length > 0);
  };

  const newProduct = () => {
    if (!usuario) return null;
    if (!validate()) return null;
    dispatch(
      salvarProduto(
        { nome, descricao, categoria, preco, sku, promocao },
        usuario.loja,
        (error) => {
          setAviso({
            status: !error,
            msg: error ? error.message : "Produto criado com sucesso.",
          });
        }
      )
    );
  };

  const renderCabecalho = () => {
    return (
      <div className="flex">
        <div className="flex-1 flex vertical">
          <Titulo tipo="h1" titulo={nome || "Novo Produto"} />
        </div>
        <div className="flex-1 flex flex-end">
          <ButtonSimples onClick={newProduct} type="success" label="Salvar" />
        </div>
      </div>
    );
  };

  const renderDados = () => {
    return (
      <div className="Dados-Produto">
        <InputSimples
          name="nome"
          label="Nome: "
          value={nome}
          error={erros.nome}
          onChange={(e) => setNome(e.target.value)}
        />
        <br />
        <TextoDados
          chave="Categoria"
          valor={
            <Select
              name="categoria"
              onChange={(e) => setCategoria(e.target.value)}
              value={categoria}
              error={erros.categoria}
              opcoes={[
                { label: "Selecionar...", value: "" },
                ...(categorias || []).map((item) => ({
                  label: item.nome,
                  value: item._id,
                })),
              ]}
            />
          }
        />
        <br />
        <TextoDados
          chave="Descricao"
          vertical
          valor={
            <div>
              <textarea
                name={"descricao"}
                onChange={(e) => setDescricao(e.target.value)}
                value={descricao}
                rows="10"
                style={{ resize: "none" }}
              />
              {erros.descricao && (
                <small className="small-danger">{erros.descricao}</small>
              )}
            </div>
          }
        />
        <InputSimples
          name="preco"
          label="Preço: "
          type="number"
          value={preco}
          error={erros.preco}
          onChange={(e) => setPreco(e.target.value)}
        />
        <InputSimples
          name="promocao"
          label="Valor em promoção: "
          value={promocao}
          error={erros.promocao}
          onChange={(e) => setPromocao(e.target.value)}
        />
        <InputSimples
          name="sku"
          label="SKU: "
          value={sku}
          error={erros.sku}
          onChange={(e) => setSku(e.target.value)}
        />
      </div>
    );
  };

  return (
    <Dashboard>
      <div className="Novo-Produto full-width">
        <div className="Card">
          <Voltar history={props.history} />
          {renderCabecalho()}
          <AlertGeral aviso={aviso} />
          <br />
          <div className="flex horizontal">
            <div className="flex-1 flex vertical">{renderDados()}</div>
            <div className="flex-1 flex vertical"></div>
          </div>
        </div>
      </div>
    </Dashboard>
  );
};
