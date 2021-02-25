import React from "react";
import { Link } from "react-router-dom";

function Voltar({ path, history }) {
  if (path)
    return (
      <Link className="Link-Voltar" to={path}>
        {"< Voltar"}
      </Link>
    );
  else
    return (
      <span className="Link-Voltar" onClick={() => history.goBack()}>
        {"< Voltar"}
      </span>
    );
}

export default Voltar;
