import React from "react";

// import { Container } from './styles';

function InputSimples({ type, label, value, onChange, placeholder, error }) {
  return (
    <div className="Input-Simples flex vertical">
      {label && <label>{label}</label>}
      {error && <small className="small-danger">{error}</small>}
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`${error ? "input-error" : ""}`}
      />
    
    </div>
  );
}

export default InputSimples;
