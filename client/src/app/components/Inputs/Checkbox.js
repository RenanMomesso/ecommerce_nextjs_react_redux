import React from 'react';

// import { Container } from './styles';

function Checkbox({label, value, onChange}) {
  return (
      <div className="Checkbox">
          <input type="checkbox" checked={value} onChange={onChange}/>
          <span>&nbsp;{label}</span>
      </div>
  )
}

export default Checkbox;