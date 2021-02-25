import React,{useEffect} from 'react'
import Configuracoes from './configuracoesComponent';

import { useSelector, useDispatch } from "react-redux";
import {
  getConfiguracao,
  updateConfiguracao,
  limparConfiguracao,
} from "../../actions/configuracoes";
import { useHistory } from 'react-router-dom';



const ConfigInitial = () => {
    const dispatch = useDispatch();
    const history = useHistory()
    const usuario = useSelector((state) => state.auth.usuario);
    const loja = useSelector((state) => state.configuracao.loja);

    console.log("loja", loja)

    useEffect(()=>{
        dispatch(getConfiguracao(usuario.loja))
    },[])

    const working = () => {
        if(!loja) return history.replace('/')
        
        return (
            <div>
                <Configuracoes loja={loja}/>
            </div>
        )
    }
    return (
        <div>
            {working()}
        </div>
    )

}

export default ConfigInitial;