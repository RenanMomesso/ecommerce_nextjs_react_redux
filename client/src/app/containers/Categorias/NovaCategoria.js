import React, { useState, useEffect } from "react";
import ButtonSimples from "../../components/Button/Simples";
import InputSimples from "../../components/Inputs/Simples";
import Voltar from "../../components/Links/Voltar";
import Titulo from "../../components/Texto/Titulo";

import { useDispatch, useSelector } from "react-redux";
import AlertGeral from "../../components/Alert/Geral";
import { GET_CATEGORIAS, GET_CATEGORIA } from "../../actions/types";
import { salvarCategoria } from "../../actions/categorias";
import Dashboard from "../Base";

const NovaCategoria = (props) => {
  const [nome, setNome] = useState("");
  const [codigo, setCodigo] = useState("");
  const [erros, setErros] = useState({});
  const [aviso, setAviso] = useState(null);

  const dispatch = useDispatch();
  const usuario = useSelector((state) => state.auth.usuario);

  const validate = () => {
    const errado = {};
    if (!nome) errado.nome = "Preencha o campo com o nome da categoria.";
    if (!codigo) errado.codigo = "Preencha o campo com o codigo da categoria.";

    setErros(errado);
    return !(Object.keys(errado).length > 0);
  };

  const saveCategory = () => {
    if (!usuario) return null;
    if (!validate()) return null;
    dispatch(
      salvarCategoria({ nome, codigo }, usuario.loja, (error) => {
        setAviso({
          status: !error,
          msg: error ? error.message : "Categoria adicionada com sucesso.",
        });
      })
    );
  };

  const renderCabecalho = () => {
    return (
      <div className="flex">
        <div className="flex-1 flex">
          <Titulo tipo="h1" titulo={nome || "Nova Categoria"} />
        </div>
        <div className="flex-1 flex flex-end">
          <ButtonSimples onClick={saveCategory} type="success" label="Salvar" />
        </div>
      </div>
    );
  };

  const renderDados = () => {
    return (
      <div className="flex-2">
        <InputSimples
          name="nome"
          label="Nome:"
          value={nome}
          erro={erros.nome}
          onChange={(e) => setNome(e.target.value)}
        />
        <InputSimples
          name="codigo"
          label="Codigo:"
          value={codigo}
          erro={erros.codigo}
          onChange={(e) => setCodigo(e.target.value)}
        />
      </div>
    );
  };

  return (
    <Dashboard>
      <div className="Nova-Categoria full-width">
        <div className="Card">
          <Voltar history={props.history} />
          <AlertGeral aviso={aviso} />
          {renderCabecalho()}
          <div className="flex horizontal">
            {renderDados()}
            <div className="flex-1"></div>
          </div>
        </div>
      </div>
    </Dashboard>
  );
};

export default NovaCategoria;
