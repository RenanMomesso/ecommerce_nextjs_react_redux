import React, { useState } from "react";
import Titulo from "../../components/Texto/Titulo";
import Input from "../../components/Inputs/Simples";
import Button from "../../components/Button/Simples";

const ResetarSenha = () => {
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");

  return (
    <div className="Recuperar-Senha flex flex-center">
      <div className="Card">
        <div className="flex flex-center">
          <Titulo tipo="h1" titulo="LOJA IT" />
        </div>
        <br />
        <div>
          <p>
            Para reiniciar a senha, digite a senha nova senha e confirme no
            campo abaixo
          </p>
        </div>
        <br />
        <div>
          <Input
            label="Senha"
            type="password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            placeholder="Digite sua nova senha"
          />
          <Input
            label="Confirmar senha"
            type="password"
            value={confirmarSenha}
            onChange={(e) => setConfirmarSenha(e.target.value)}
            placeholder="Confirme sua nova senha"
          />
        </div>
        <div className="flex flex-center">
          <Button type="success" rota="/login" label="RESETAR SENHA" />
        </div>
      </div>
    </div>
  );
};

export default ResetarSenha;
