import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import ListItems from "./ListItems";

// import { Container } from './styles';

function Menu(props) {
  const history = useHistory();
  const [open, setOpen] = useState(true);

  const toggleOpen = () => {
    setOpen(!open);
  };
  return (
    <div className={`Menu full-height ${open ? "menu-open" : ""}`}>
      <div
        className={`item-top flex ${open ? "flex-end" : "flex-center"}`}
        onClick={toggleOpen}
      >
        <i className={`fas fa-arrow-${open ? "left" : "right"}`} />
      </div>
      <hr />
      <ListItems open={open} history={history} />
    </div>
  );
}

export default Menu;
