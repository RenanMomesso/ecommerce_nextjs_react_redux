import React, { useState } from "react";
import ButtonSimples from "../../components/Button/Simples";

const InputValor = (props) => {
  const [value, setValue] = useState(props.value);
  const [form, setForm] = useState(false);

  const handleSubmit = (value) => {

    props.handleSubmit(value);
    
    toggleForm();
  };

  const toggleForm = () => {
    setForm(!form);
    setValue(value);
  };
  const renderForm = () => {
    return (
      <div className="Input-valor flex input-valor-open">
        <div className="flex vertical">
          <input
          onBlur={props.erroexisting}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            name={props.name}
            type={props.type || "text"}
          />
          {props.erro && <small className="small-danger">{props.erro}</small>}
        </div>
        <div className="flex flex-center">
          <ButtonSimples
            type="success button-small"
            onClick={() => handleSubmit(value)}
            label={<i className="fas fa-check" />}
          />
          <ButtonSimples
            type="danger button-small"
            onClick={() => toggleForm(value)}
            label={<i className="fas fa-times" />}
          />
        </div>
      </div>
    );
  };

  const renderValue = () => {
    return (
      <div className="flex vertical">
        <div className="Input-Valor flex" onClick={() => toggleForm()}>
          <span className={props.noStyle ? "input-nostyle" : "input"}>
            {value}
          </span>
          <div className="flex flex-center">
            <ButtonSimples
              type="warning button-small"
              label={<i className="fas fa-edit" />}
            />
          </div>
        </div>
        {props.erro && <small className="small-danger">{props.erro}</small>}
      </div>
    );
  };

  return form ? renderForm() : renderValue();
};

export default InputValor;
