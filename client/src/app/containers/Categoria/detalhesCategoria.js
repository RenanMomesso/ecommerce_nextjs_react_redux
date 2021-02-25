import React, { useEffect, useState } from "react";
import ButtonSimples from "../../components/Button/Simples";
import InputValor from "../../components/Inputs/InputValor";
import { TextoDados } from "../../components/Texto/Dados";
import Titulo from "../../components/Texto/Titulo";
import InputSelect from "../../components/Inputs/Select";
import Voltar from "../../components/Links/Voltar";
import { useSelector, useDispatch } from "react-redux";
import AlertGeral from "../../components/Alert/Geral";
import { removerCategoria, updateCategoria } from "../../actions/categorias";

function DetalhesCategoria(props) {
  const dispatch = useDispatch();

  const usuario = useSelector((state) => state.auth.usuario);
  const categoria = props.categoria;

  console.log(props.categoria);

  const [aviso, setAviso] = useState(null);
  const [erros, setErros] = useState({});

  const [categoriaForm, setCategoriaForm] = useState({
    nome: categoria.nome ? categoria.nome : "",
    codigo: categoria ? categoria.codigo : "",
    disponibilidade: categoria
      ? categoria.disponibilidade || categoria.disponibilidade === undefined
        ? "disponivel"
        : "indisponivel"
      : "",
  });

  const handleSubmit = (field, value) => {
    validate()
    setCategoriaForm({ ...categoriaForm, [field]: value });
  };



  const { nome, codigo, disponibilidade } = categoriaForm;

  const validate = () => {
    const errado = {};
    if (!nome) errado.nome = "Preencha o campo com o nome da categoria.";
    if (!codigo) errado.codigo = "Preencha o campo com o codigo da categoria.";

    setErros(errado);
    return !(Object.keys(errado).length > 0);
  };

  const salvarCategoria = () => {
    validate();
    if (!usuario || !categoria) return null;
    dispatch(
      updateCategoria(
        { nome, codigo, disponibilidade },
        categoria._id,
        usuario.loja,
        (error) => {
          setAviso({
            status: !error,
            msg: error ? error.message : "Categoria atualizada com sucesso.",
          });
        }
      )
    );
  };

  const deletarCategoria = () => {
    if (!usuario || !categoria) return null;
    if (window.confirm("Você realmente deseja remover esta catgoria ? ")) {
      dispatch(
        removerCategoria(categoria._id, usuario.loja, (error) => {
          if (error) setAviso({ status: false, msg: error.message });
          else props.history.goBack();
        })
      );
    }
  };

  const renderCabecalho = () => {
    return (
      <div className="flex">
        <div className="flex-1 flex">
          <Titulo tipo="h1" titulo={nome} />
        </div>
        <div className="flex-1 flex flex-end">
          <ButtonSimples
            onClick={salvarCategoria}
            type="success"
            label="Salvar"
          />
          <ButtonSimples
            onClick={deletarCategoria}
            type="danger"
            label="Remover"
          />
        </div>
      </div>
    );
  };

  const renderDados = () => {
    return (
      <div className="flex vertical">
        <TextoDados
          chave="Nome"
          valor={
            <InputValor
            erroexisting={erros.nome}
              name="nome"
              erro={erros.nome}
              noStyle
              value={nome}
              handleSubmit={(valor) => handleSubmit("nome", valor)}
            />
          }
        />
        <TextoDados
          chave="Código"
          valor={
            <InputValor
              name="Código"
              erro={erros.codigo}
              noStyle
              value={codigo}
              handleSubmit={(valor) => handleSubmit("codigo", valor)}
            />
          }
        />

        <br />
        <TextoDados
          chave="Disponibilidade"
          valor={
            <InputSelect
              name="disponibilidade"
              onChange={(valor) => handleSubmit("disponibilidade", valor)}
              value={disponibilidade}
              opcoes={[
                { label: "Disponivel", value: "disponivel" },
                { label: "Indisponível", value: "indisponivel" },
              ]}
            />
          }
        />
      </div>
    );
  };

  return (
    <div className="Detalhes-Categoria">
      <Voltar path={props.history} />
      <AlertGeral aviso={aviso} />
      {renderCabecalho()}
      {renderDados()}
    </div>
  );
}

export default DetalhesCategoria;
