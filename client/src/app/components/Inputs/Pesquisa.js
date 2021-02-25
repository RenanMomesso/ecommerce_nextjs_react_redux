import React from 'react';

// import { Container } from './styles';

function Pesquisa({valor, onChange, placeholder, onClick}) {
  return (
      <div className="Pesquisa flex horizontal">
          <input value={valor} onChange={onChange} placeholder={placeholder}/>
          <button>
            <i className="fas fa-search" onClick={onClick}/>
          </button>
      </div>
  )
}

//PODE SER FEITO ASSIM
//function Pesquisa(props) {
  //  return (
    //    <div className="Pesquisa">
      //      <input {...props} />
       // </div>
   // )
 // }

export default Pesquisa;