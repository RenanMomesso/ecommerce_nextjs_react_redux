import React, { useState, useEffect } from "react";
import Titulo from "../../components/Texto/Titulo";
import ButtonSimples from "../../components/Button/Simples";
import { TextoDados } from "../../components/Texto/Dados";
import InputValor from "../../components/Inputs/InputValor";
import ListaDinamicaSimples from "../../components/Listas/ListaDinamicaSimples";
import Dashboard from "../Base/index";

import AlertGeral from "../../components/Alert/Geral";
import { useSelector, useDispatch } from "react-redux";
import {
  getConfiguracao,
  updateConfiguracao,
  limparConfiguracao,
} from "../../actions/configuracoes";

const Configuracoes = ({loja}) => {
  const dispatch = useDispatch();

  const generateStateConfiguracao = () => ({
    nome: loja && loja ? loja.nome : "asd",
    CNPJ: loja && loja.cnpj ? loja.cnpj : "",
    email: loja ? loja.email : "",

    endereco: loja ? loja.endereco.local : "",
    numero: loja ? loja.endereco.numero : "",
    bairro: loja ? loja.endereco.bairro : "",
    cidade: loja ? loja.endereco.cidade : "",
    estado: loja ? loja.endereco.estado : "",
    cep: loja ? loja.endereco.CEP : "",

    telefones: loja ? loja.telefones : [],
  });
  console.log("loja", loja);
  const [formConfig, setFormConfig] = useState(generateStateConfiguracao());

  const [aviso, setAviso] = useState(null);
  const [erros, setErros] = useState({});

  const usuario = useSelector((state) => state.auth.usuario);

  const getConfiguracaoFunc = () => {
    if (!usuario) return null;
    dispatch(getConfiguracao(usuario.loja));
  };

  useEffect(() => {
    getConfiguracaoFunc();
    if (loja !== null) {
      generateStateConfiguracao();
    }
  }, []);

  const updateLoja = () => {
    if (!usuario || !validate()) return null;
    dispatch(
      updateConfiguracao(formConfig, usuario.loja, (error) => {
        setAviso({
          aviso: {
            status: !error,
            msg: error
              ? error.message
              : "Configuração da loja atualizada com sucesso",
          },
        });
      })
    );
  };

  const {
    CNPJ,
    nome,
    bairro,
    endereco,
    numero,
    cep,
    email,
    estado,
    cidade,
    telefones,
  } = formConfig;

  const validate = () => {
    const errado = {};

    if (!nome) errado.nome = "Preencha aqui com o nome da loja";
    if (!CNPJ) errado.CNPJ = "Preencha aqui com o CNPJ da loja";
    if (!email) errado.email = "Preencha aqui com o email da loja";
    if (!endereco) errado.endereco = "Preencha aqui com o endereço da loja";
    if (!numero) errado.numero = "Preencha aqui com o número da loja";
    if (!bairro) errado.bairro = "Preencha aqui com o bairro da loja";
    if (!cidade) errado.cidade = "Preencha aqui com a cidade da loja";
    if (!estado) errado.estado = "Preencha aqui com o estado da loja";
    if (!cep) errado.cep = "Preencha aqui com o CEP da loja";

    setErros(errado);
    return !(Object.keys(errado).length > 0);
  };

  const renderCabecalho = () => {
    return (
      <div className="flex">
        <div className="flex-1 flex">
          <Titulo tipo="h1" titulo="Configurações" />
        </div>
        <div className="flex-1 flex flex-end">
          <ButtonSimples
            type="success"
            onClick={() => updateLoja()}
            label={"Salvar"}
          />
        </div>
      </div>
    );
  };

  const handleSubmit = (field, value) => {
    setFormConfig({ ...formConfig, [field]: value });
    validate();
  };

  const renderDadosConfiguracao = () => {
    if (!loja) return null;
    return (
      <div className="dados-configuracao">
        <TextoDados
          chave="Nome"
          valor={
            <InputValor
              value={nome}
              name="nome"
              noStyle
              erro={erros.nome}
              handleSubmit={(valor) => handleSubmit("nome", valor)}
            />
          }
        />
        <TextoDados
          chave="CNPJ"
          valor={
            <InputValor
              value={CNPJ}
              name="CNPJ"
              noStyle
              erro={erros.CNPJ}
              handleSubmit={(valor) => handleSubmit("CNPJ", valor)}
            />
          }
        />
        <TextoDados
          chave="E-mail"
          valor={
            <InputValor
              value={email}
              name="email"
              noStyle
              erro={erros.email}
              handleSubmit={(valor) => handleSubmit("email", valor)}
            />
          }
        />
      </div>
    );
  };

  const renderDadosEndereco = () => {
    return (
      <div className="dados-configuracao">
        <TextoDados
          chave="Endereço"
          valor={
            <InputValor
              value={endereco}
              name="endereco"
              noStyle
              erro={erros.endereco}
              handleSubmit={(valor) => handleSubmit("endereco", valor)}
            />
          }
        />
        <TextoDados
          chave="Número"
          valor={
            <InputValor
              value={numero}
              name="numero"
              noStyle
              erro={erros.numero}
              handleSubmit={(valor) => handleSubmit("numero", valor)}
            />
          }
        />
        <TextoDados
          chave="Bairro"
          valor={
            <InputValor
              value={bairro}
              name="bairro"
              noStyle
              erro={erros.bairro}
              handleSubmit={(valor) => handleSubmit("bairro", valor)}
            />
          }
        />
        <TextoDados
          chave="Cidade"
          valor={
            <InputValor
              value={cidade}
              name="cidade"
              noStyle
              erro={erros.endereco}
              handleSubmit={(valor) => handleSubmit("cidade", valor)}
            />
          }
        />
        <TextoDados
          chave="Estado"
          valor={
            <InputValor
              value={estado}
              name="estado"
              noStyle
              erro={erros.endereco}
              handleSubmit={(valor) => handleSubmit("estado", valor)}
            />
          }
        />
        <TextoDados
          chave="CEP"
          valor={
            <InputValor
              value={cep}
              name="cep"
              noStyle
              erro={erros.endereco}
              handleSubmit={(valor) => handleSubmit("cep", valor)}
            />
          }
        />
      </div>
    );
  };

  const onAdd = (valor) => {
    if (!valor) return;
    setFormConfig({ ...formConfig, telefones: [...telefones, valor] });
  };

  const onRemove = (idx) => {
    if (idx === undefined) return;

    setFormConfig({
      ...formConfig,
      telefones: telefones.filter((item, index) => index !== idx),
    });
  };

  const renderTelefones = () => {
    return (
      <div className="dados-telefones">
        <Titulo tipo="h3" titulo="Telefones" />
        <ListaDinamicaSimples
          dados={telefones}
          onAdd={onAdd}
          onRemove={onRemove}
        />
      </div>
    );
  };

  return (
    <Dashboard>
      <div className="Configuracoes full-width">
        <div className="Card">
          {renderCabecalho()}
          <AlertGeral aviso={aviso} />
          <div className="flex horizontal">
            <div className="flex-1">{renderDadosConfiguracao()}</div>
          </div>
          <br />
          <hr />
          <br />
          <div className="flex horizontal">
            <div className="flex-1">{renderDadosEndereco()}</div>
            <div className="flex-1">{renderTelefones()}</div>
          </div>
        </div>
      </div>
    </Dashboard>
  );
};

export default Configuracoes;
