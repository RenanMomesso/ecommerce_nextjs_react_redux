import React, { useState } from "react";
import ButtonSimples from "../Button/Simples";
import InputSimples from "../Inputs/Simples";

// import { Container } from './styles';

function ListaDinamicaSimples(props) {
    const {dados, onRemove} = props;
    const [texto, setTexto] = useState("")


    const onAdd = () => {
        props.onAdd(texto)
        setTexto("")
        
    }
  return (
    <div>
      {dados.map((item, idx) => (
        <div key={idx} className="flex horizontal">
          <div className="flex-3 flex flex-start border-green">
            <span>{item}</span>
          </div>
          {onRemove && (
            <div className="flex flex-center">
              <ButtonSimples
                type="danger"
                onClick={() => onRemove(idx)}
                label=" - "
              />
            </div>
          )}
        </div>
      ))}
      <div className="flex horizontal">
        <div className="flex flex-start">
          <InputSimples
            type="text"
            value={texto}
            onChange={(e) => setTexto(e.target.value)}
          />
        </div>
        <div className="flex flex-center">
          <ButtonSimples
            type="success button-small"
            onClick={() => onAdd(texto)}
            label=" + "
          />
        </div>
      </div>
    </div>
  );
}

export default ListaDinamicaSimples;
