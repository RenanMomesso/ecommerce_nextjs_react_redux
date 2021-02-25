import React from 'react';


const BarraTopo = (props) => (
    <div className="Barra-Topo flex horizontal full-width">
      <div className="flex-1 flex flex-start">
        <a href="/">Ver loja</a>
      </div>
      <div className="flex-1 flex flex-end">
        <a href="/" onClick={()=>props.handlingLogout()}>
          Sair
        </a>
      </div>
    </div>
  )



export default BarraTopo;