import React, { useState } from "react";
import Titulo from "../../components/Texto/Titulo";
import Input from "../../components/Inputs/Simples";
import Checkbox from "../../components/Inputs/Checkbox";
import {  Redirect } from "react-router-dom";
import Button from "../../components/Button/Simples";
import { handleLogin, getUser } from "../../actions";
import { useSelector, useDispatch } from "react-redux";
import { api, versao } from "../../config";
import Alert from '../../components/Alert/Danger'

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [opcaoLembrar, setOpcaoLembrar] = useState(true);
  const [erros, setErros] = useState({});

  const authorized = useSelector((state) => state.auth.authorized);
  const usuario = useSelector((state) => state.auth.usuario);

  const dispatch = useDispatch();
  const handleSubmit = () => {
    if (!validate()) return;
    dispatch(
      handleLogin({ email, password, opcaoLembrar }, (error) => {
        erros.form = error
        setErros({...erros, form:error})
      })
    );
  };
  if (authorized && getUser() && usuario.role.includes("admin"))
    return <Redirect to="/" />;

  const validate = () => {
    const errado = {};
    if (!email) errado.email = "Preencha aqui com seu e-mail";
    if (!password) errado.password = "Preencha aqui com sua senha";

    setErros(errado);
    return !(Object.keys(errado).length > 0);
  };

const changeEmail = e => {
  setEmail(e.target.value)
  validate()
}
  const changePassword = e => {
    setPassword(e.target.value)
    validate()
  }


  return (
    <div className="Login flex flex-center">
      <div className="Card">
        <div className="flex vertical flex-center">
          <Titulo tipo="h1" titulo="LOJA IT" />
          <p>Faça seu login abaixo</p>
        </div>
        <br />
        <br />

        <Alert error={erros.form} />
        <Input
          label="E-mail"
          value={email}
          error={erros.email}
          onChange={changeEmail}
          placeholder="Coloque seu email"
        
        />
        <Input
          label="Senha"
          value={password}
          onChange={changePassword}
          error={erros.password}
          placeholder={"Coloque sua senha"}
        />

        <div className="flex">
          <div className="flex-1">
            <Checkbox
              label="Lembrar?"
              value={opcaoLembrar}
              onChange={() => setOpcaoLembrar(!opcaoLembrar)}
            />
          </div>
          <div className="flex-1 flex flex-center">
            {/*<Link to="/recuperar-senha">            <smal>Esqueceu sua senha?</smal>            </Link>*/}
            <a href={`${api}/${versao}/api/usuarios/recuperar-senha`}>
              <small>Esqueceu sua senha?</small>
            </a>
          </div>
        </div>
        <br />
        <br />
        <div className="flex flex-center">
          <Button
            type="success"
            label={"ENTRAR"}
            onClick={() => handleSubmit()}
          />
        </div>
      </div>
    </div>
  );
}

export default Login;
