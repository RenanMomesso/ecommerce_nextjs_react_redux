import React from "react";

// import { Container } from './styles';

export const TextoDados = ({ chave, valor, vertical = false }) => (
  <div className={`Text-Dados flex ${vertical ? "vertical" : "horizontal"}`}>
    <strong className={`Text-Dados flex ${!vertical ? "flex-center": ""} `}> {chave}:&nbsp;</strong>
    <span>{valor}</span>
  </div>
);
