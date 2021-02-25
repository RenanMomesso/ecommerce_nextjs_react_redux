import React, { useState } from "react";
import Titulo from "../../components/Texto/Titulo";
import Input from "../../components/Inputs/Simples";
import Button from "../../components/Button/Simples";

const RecuperarSenha = () => {
  const [email, setEmail] = useState("");

  return (
    <div className="Recuperar-Senha flex flex-center">
      <div className="Card">
        <div className="flex flex-center">
          <Titulo tipo="h1" titulo="LOJA IT" />
        </div>
        <br />
        <div>
          <p>Para reiniciar sua senha, digite seu e-mail abaixo.</p>

          <p>Iremos enviar um link para você acessar e entrar uma nova senha</p>
        </div>
        <br />
        <div>
          <Input
            label="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Digite aqui seu e-mail"
          />
        </div>
        <br />
        <div className="flex flex-center">
          <Button
            type="success"
            rota="/resetar-senha/1"
            label="RESETAR SENHA"
          />
        </div>
      </div>
    </div>
  );
};

export default RecuperarSenha;
