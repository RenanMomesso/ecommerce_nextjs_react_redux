import React, {useState, useEffect} from 'react';
import ButtonSimples from '../../../components/Button/Simples';
import { TextoDados } from '../../../components/Texto/Dados';
import Titulo from '../../../components/Texto/Titulo';
import InputSimples from '../../../components/Inputs/Simples'
import AlertGeral from '../../../components/Alert/Geral';

import {useDispatch, useSelector} from 'react-redux'
import { getVariacoes,getVariacao,limparVariacao,salvarVariacao } from '../../../actions/variacoes';
import InputSelect from '../../../components/Inputs/Select';

const NovaVariacao = () => {

    const produto = useSelector(state => state.produto.produto)
    const usuario = useSelector(state => state.auth.usuario)
    const dispatch = useDispatch()

    console.log("produto",produto)
    console.log("Usuario", usuario)


   const [novaForm, setNovaForm] = useState({
    codigo: "",
    nome: "",
    preco: 0,
    promocao: 0,
    quantidade: 0,
    peso: 0,
    freteGratis: "nao",
    largura: 0,
    altura: 0,
    comprimento: 0,
 

   })

   

   const [erros, setErros] = useState({})
   const [aviso, setAviso] = useState(null)
           
        
   const {codigo, nome, preco, promocao, quantidade, peso, freteGratis, largura,altura, comprimento} = novaForm
    

    const onChangeInput = (field, value) => {
        
        setNovaForm({...novaForm, [field]:value})
        validate()
    }

    const validate = () => {
    
        const falaha = {};

        if(!codigo) falaha.codigo = "Preencha aqui com o código da variação";
        if(!nome) falaha.nome = "Preencha aqui com o nome da variação";
        if(!preco) falaha.preco = "Preencha aqui com o preço da variação";
        if(!quantidade) falaha.quantidade = "Preencha aqui com a quantidade da variação";
        if(!peso) falaha.peso = "Preencha aqui com o peso da variação";
        if(!largura) falaha.largura = "Preencha aqui com a largura da variação";
        if(!altura) falaha.altura = "Preencha aqui com o altura da variação";
        if(!comprimento) falaha.comprimento = "Preencha aqui com o comprimento da variação";

     setErros(falaha)
        return !( Object.keys(falaha).length > 0 );  
    }

    const handlesalvarVariacao = () => {
        setErros(null)
        
        if(!usuario || !produto || !validate()) return null;
        dispatch(salvarVariacao(novaForm, produto._id, usuario.loja, (error) => {
            setAviso({ 
                aviso: {
                    status: !error,
                    msg: error ? error.messsage : "Variação criada com sucesso."
                }
            });
            dispatch(getVariacoes(produto._id, usuario.loja));
        }))
    }

    const renderCabecalho = () => {
       
        return (
            <div className="flex horizontal">
                <div className="flex-1">
                    <Titulo tipo="h3" titulo={nome ? "Variação - " + nome : "Nova Variação"} />
                </div>
                <div className="flex-1 flex flex-end">
                    <ButtonSimples 
                        type="success" 
                        onClick={handlesalvarVariacao} 
                        label="Salvar" />
                </div>
            </div>
        )
    }

    const renderDadosCadastrais = () => {
     
        return (
            <div className="Dados-Produto">
                <InputSimples
                    name="codigo"
                    label="Código:"
                    value={codigo}
                    error={erros.codigo}
                    onChange={(ev) => onChangeInput("codigo", ev.target.value)} />
                <InputSimples
                    name="nome"
                    label="Nome:"
                    value={nome}
                    error={erros.nome}
                    onChange={(ev) => onChangeInput("nome", ev.target.value)} />
                <InputSimples
                    name="preco"
                    label="Preço Padrão:"
                    type="number"
                    value={preco}
                    error={erros.preco}
                    onChange={(ev) => onChangeInput("preco", ev.target.value)} />
                <InputSimples
                    name="promocao"
                    label="Preço Promocional:"
                    type="number"
                    value={promocao}
                    error={erros.promocao}
                    onChange={(ev) => onChangeInput("promocao", ev.target.value)} />
                <InputSimples
                    name="quantidade"
                    type="number"
                    label="Quantidade:"
                    value={quantidade}
                    error={erros.quantidade}
                    onChange={(ev) => onChangeInput("quantidade", ev.target.value)} />
            </div>
        )
    }

    const renderDadosEnvio = ()=>{
        
        return (
            <div className="Dados-Produto">
                <InputSimples
                    name="peso"
                    label="Peso (Kg):"
                    type="number"
                    value={peso}
                    error={erros.peso}
                    onChange={(ev) => onChangeInput("peso", ev.target.value)} />
                <TextoDados
                    chave="Frete Grátis?"
                    valor={(
                        <InputSelect
                            name="freteGratis"
                            onChange={(ev) => onChangeInput("freteGratis", ev.target.value)}
                            value={freteGratis}
                            opcoes={[
                                { label: "Sim", value: "sim" },
                                { label: "Não", value: "nao" },
                            ]} />
                    )} />
                <InputSimples
                    name="largura"
                    label="Largura (cm):"
                    type="number"
                    value={largura}
                    error={erros.largura}
                    onChange={(ev) => onChangeInput("largura", ev.target.value)} />
                <InputSimples
                    name="comprimento"
                    type="number"
                    label="Comprimento:"
                    value={comprimento}
                    error={erros.comprimento}
                    onChange={(ev) => onChangeInput("comprimento", ev.target.value)} />
                <InputSimples
                    name="altura"
                    type="number"
                    label="Altura:"
                    value={altura}
                    error={erros.altura}
                    onChange={(ev) => onChangeInput("altura", ev.target.value)} />
            </div>
        )
    }

    
        return(
            <div className="Nova-Variacao">
                { renderCabecalho() }
                <AlertGeral aviso={aviso} />
                <br />
                <div className="flex horizontal">
                    <div className="flex-3">
                        { renderDadosCadastrais() }
                    </div>
                    <div className="flex-1"></div>
                    <div className="flex-3">
                        { renderDadosEnvio() }
                    </div>
                </div>
            </div>
        )
    
}



export default NovaVariacao