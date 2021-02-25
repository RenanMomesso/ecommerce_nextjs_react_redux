import React, { useEffect } from "react";
import Titulo from "../Texto/Titulo";
import { api, versao } from "../../config";

// import { Container } from './styles';



const BlocoImagens = ({ imagens, handleSubmit, onRemove }) => {

  useEffect(()=>{
    rendendoImagens()
  }
  ,[imagens, handleSubmit,onRemove ])

  const rendendoImagens = () => {
    return(
      <div className="imagens-container">
      {imagens && imagens.map((src, idx) => (
        <div
          className="imagem-container flex flex-center"
          style={{ backgroundImage: `url("${api}/public/images/${src}")` }}
          key={idx}
        >
          <div
            className="imagem-remover flex flex-center"
            onClick={() => onRemove(idx)}
          >
            <span>{"-"}</span>
          </div>
        </div>
      ))}
    </div>
    )
  }
 
  return (
    <div className="Bloco-Imagem">
      <div className="flex horizontal">
        <Titulo tipo="h3" titulo="Imagens" />
      </div>
      <div className="flex vertical">
        <label>
          <strong>Insira aqui uma nova imagem: &nbsp;</strong>
        </label>
        <input type="file" multiple onChange={handleSubmit} />
      </div>
      <hr />
      <br />
      {rendendoImagens()}
    </div>
  );
};

export default BlocoImagens;
