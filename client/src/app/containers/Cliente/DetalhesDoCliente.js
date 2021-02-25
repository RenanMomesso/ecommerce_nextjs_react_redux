import React, { useEffect, useState } from "react";
import ButtonSimples from "../../components/Button/Simples";
import { TextoDados } from "../../components/Texto/Dados";
import Titulo from "../../components/Texto/Titulo";
import InputValor from "../../components/Inputs/InputValor";
import Voltar from "../../components/Links/Voltar";

import AlertGeral from "../../components/Alert/Geral";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import { removerClientes, updateCliente } from "../../actions/clientes";

const DetalhesDoCliente = (props) => {
  const usuario = useSelector((state) => state.auth.usuario);
  const dispatch = useDispatch();

  const [aviso, setAviso] = useState(null);
  const [erros, setErros] = useState({});
  const [clienteForm, setClienteForm] = useState({
    nome: props.clientela && props.clientela.nome ? props.clientela.nome : "",
    numero:
      props.clientela && props.clientela.endereco.numero
        ? props.clientela.endereco.numero
        : "0",
    CPF: props.clientela && props.clientela.cpf ? props.clientela.cpf : "",
    email:
      props.clientela && props.clientela.usuario
        ? props.clientela.usuario.email
        : "",
    telefone:
      props.clientela && props.clientela.telefones
        ? props.clientela.telefones[0]
        : "",
    dataDeNascimento:
      props.clientela && props.clientela.dataDeNascimento
        ? moment(props.clientela.dataDeNascimento).format("DD/MM/YYYY")
        : "",
    endereco:
      props.clientela && props.clientela.endereco
        ? props.clientela.endereco.local
        : "",
    bairro:
      props.clientela && props.clientela.endereco
        ? props.clientela.endereco.bairro
        : "",
    cidade:
      props.clientela && props.clientela.endereco
        ? props.clientela.endereco.cidade
        : "",
    estado:
      props.clientela && props.clientela.endereco
        ? props.clientela.endereco.estado
        : "",
    cep:
      props.clientela && props.clientela.endereco
        ? props.clientela.endereco.CEP
        : "",
  });

 

  console.log("Clienteform", clienteForm);
  const salvarCliente = () => {
    setAviso(null);
    if (!usuario || !props.clientela) return null;
    if (!validate()) return null;
    dispatch(
      updateCliente(clienteForm, props.clientela._id, usuario.loja, (error) => {
        setAviso({
          status: !error,
          msg: error ? error.message : "Cliente atualizado com sucesso",
        });
      })
    );
  };

  const validate = () => {
    const errado = {};
    if (!nome) errado.nome = "Preencha o campo com o nome do cliente.";
    if (!CPF) errado.CPF = "Preencha o campo com o CPF do cliente.";
    if (!telefone)
      errado.telefone = "Preencha o campo com o telefone do cliente.";
    if (!dataDeNascimento)
      errado.dataDeNascimento =
        "Preencha o campo com o data de nascimento do cliente.";
    if (!email) errado.email = "Preencha o campo com o email do cliente.";
    if (!numero)
      errado.numero = "Preencha o campo com o numero do endereço do cliente.";
    if (!bairro) errado.bairro = "Preencha o campo com o bairro do cliente.";
    if (!cidade) errado.cidade = "Preencha o campo com o cidade do cliente.";
    if (!estado) errado.estado = "Preencha o campo com o estado do cliente.";
    if (!cep) errado.cep = "Preencha o campo com o cep do cliente.";

    setErros(errado);
    return !(Object.keys(errado).length > 0);
  };

  const handleSubmit = (field, value) => {
    validate()
    setClienteForm({...clienteForm, [field]: value});
    validate()
    
  };


  const removeClient = () => {
    if (!usuario || !props.clientela) return null;
    if (window.confirm("Você realmente quer excluir este cliente ?")) {
      dispatch(
        removerClientes(props.clientela._id, usuario.loja, (error) => {
          setAviso({
            status: !error,
            msg: error ? error.message : "Cliente removido com sucesso",
          });
        })
      );
    }
  };

  const {
    nome,
    numero,
    CPF,
    bairro,
    email,
    telefone,
    endereco,
    cep,
    cidade,
    dataDeNascimento,
    estado,
  } = clienteForm;

  const renderCabecalho = () => {
    if (!props.clientela) return null;
    return (
      <div className="flex">
        <div className="flex flex-1">
          <Titulo tipo="h1" titulo={nome} />
        </div>
        {props.clientela && props.clientela.deletado ? (
          <div className="flex-1 flex flex-end">
            <ButtonSimples label="Removido" type="danger" />
          </div>
        ) : (
          <div className="flex-1 flex flex-end">
            <ButtonSimples
              onClick={() => salvarCliente()}
              label="Salvar"
              type="success"
            />
            <ButtonSimples
              onClick={removeClient}
              label="Remover"
              type="danger"
            />
          </div>
        )}
      </div>
    );
  };

  console.log("Erros", erros);
  const renderDetalhesCadastro = () => {
    if (!props.clientela) return null;
    return (
      <div className="Detalhes-do-Cadastro">
        <TextoDados
          chave="Nome"
          valor={
            <InputValor
              noStyle
              erro={erros.nome}
              name="nome"
              handleSubmit={(valor) => handleSubmit("nome", valor)}
              value={nome}
            />
          }
        />
        <TextoDados
          chave="CPF"
          valor={
            <InputValor
              noStyle
              erro={erros.CPF}
              name="cpf"
              handleSubmit={(valor) => handleSubmit("CPF", valor)}
              value={CPF}
            />
          }
        />
        <TextoDados
          chave="Telefone"
          valor={
            <InputValor
              noStyle
              erro={erros.telefone}
              name="telefone"
              handleSubmit={(valor) => handleSubmit("telefone", valor)}
              value={telefone}
            />
          }
        />
        <TextoDados
          chave="E-mail"
          valor={
            <InputValor
              noStyle
              erro={erros.email}
              name="email"
              handleSubmit={(valor) => handleSubmit("email", valor)}
              value={email}
            />
          }
        />
        <TextoDados
          chave="Data de Nascimento"
          valor={
            <InputValor
              noStyle
              erro={erros.dataDeNascimento}
              name="dataDeNascimento"
              handleSubmit={(valor) => handleSubmit("dataDeNascimento", valor)}
              value={dataDeNascimento}
            />
          }
        />
      </div>
    );
  };

  const renderDetalhesEntrega = () => {
    if (!props.clientela) return null;
    return (
      <div className="Detalhes-da-Entrega">
        <TextoDados
          chave="Endereço"
          valor={
            <InputValor
              noStyle
              erro={erros.endereco}
              name="endereco"
              handleSubmit={(valor) => handleSubmit("endereco", valor)}
              value={endereco}
            />
          }
        />
        <TextoDados
          chave="Numero"
          valor={
            <InputValor
              noStyle
              erro={erros.numero}
              name="numero"
              handleSubmit={(valor) => handleSubmit("numero", valor)}
              value={numero}
            />
          }
        />
        <TextoDados
          chave="Bairro"
          valor={
            <InputValor
              noStyle
              erro={erros.bairro}
              name="bairro"
              handleSubmit={(valor) => handleSubmit("bairro", valor)}
              value={bairro}
            />
          }
        />
        <TextoDados
          chave="Cidade"
          valor={
            <InputValor
              noStyle
              erro={erros.cidade}
              name="cidade"
              handleSubmit={(valor) => handleSubmit("cidade", valor)}
              value={cidade}
            />
          }
        />
        <TextoDados
          chave="Estado"
          valor={
            <InputValor
              noStyle
              erro={erros.estado}
              name="Estado"
              handleSubmit={(valor) => handleSubmit("estado", valor)}
              value={estado}
            />
          }
        />
        <TextoDados
          chave="CEP"
          valor={
            <InputValor
              noStyle
              erro={erros.cep}
              name="cep"
              handleSubmit={(valor) => handleSubmit("cep", valor)}
              value={cep}
            />
          }
        />
      </div>
    );
  };

  return (
    <div className="DetalhesDocliente">
      <Voltar history={props.history} />
      {renderCabecalho()}
      <AlertGeral aviso={aviso} />
      <div className="flex horizontal">
        <div className="flex-1 flex vertical">{renderDetalhesCadastro()}</div>
        <div className="flex-1 flex vertical">{renderDetalhesEntrega()}</div>
      </div>
    </div>
  );
};

export default DetalhesDoCliente;
