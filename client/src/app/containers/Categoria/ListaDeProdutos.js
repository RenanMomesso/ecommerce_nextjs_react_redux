import React, { useEffect, useState } from "react";
import Titulo from "../../components/Texto/Titulo";
import Tabela from "../../components/Tabela/Simples";
import Paginacao from "../../components/Paginacao/Simples";
import { useDispatch, useSelector } from "react-redux";
import { getCategoriaProdutos,categoriaProdutoPesquisa } from "../../actions/categorias";

function ListaDeProdutos(props) {
  const dispatch = useDispatch();
  const [atual, setAtual] = useState(0);
  const [limite, setLimite] = useState(5);

  const categoria = props.categoria;

  const categoriaProdutos = useSelector(state => state.categoria.categoriaProdutos)

  const carregarProdutosCategoria = () => {
    if (!usuario || !categoria) return null;
    dispatch(getCategoriaProdutos(categoria._id, atual, limite, usuario.loja));
  };
  const changeNumeroAtual = (nAtual) => {
    setAtual(nAtual);
  };

  useEffect(() => {
    carregarProdutosCategoria();
  }, [atual]);

  const usuario = useSelector((state) => state.auth.usuario);



  const dados = [];
        (categoriaProdutos ? categoriaProdutos.docs : []).forEach((item)=>{
            dados.push({
                "Produto": item.titulo, 
                "SKU": item.sku, 
                "Disponibilidade": item.disponibilidade ? "Disponível" : "Indisponível",
                "botaoDetalhes": `/produto/${item._id}`
            });
        });

  return (
    <>
      <div className="ListaDeProdutos">
        <br />
        <br />
        <hr />
        <br />
        <Titulo tipo="h2" titulo="Produtos da Categorias" />
        <br />
       
        <br />
        <Tabela
           cabecalho={["Produto", "SKU", "Disponibilidade" ]}
          dados={dados}
        />
        <Paginacao
          atual={atual}
          total={categoriaProdutos ? categoriaProdutos.total : 0}
          limite={limite}
          onClick={(numeroAtual) => changeNumeroAtual(numeroAtual)}
        />
      </div>
    </>
  );
}

export default ListaDeProdutos;
