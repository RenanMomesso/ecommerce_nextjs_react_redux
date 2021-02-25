import React, {useEffect} from "react";
import { Provider } from "react-redux";
import store from "./store";
import { BrowserRouter as Router, Route } from "react-router-dom";
import AdminRoute from "./containers/HOC/Base";

import { initApp } from './actions'

//CONTAINER COM Base
import Pedidos from "./containers/Pedidos";
import Pedido from "./containers/Pedido";

import Clientes from "./containers/Clientes";
import Cliente from "./containers/Cliente";

import Produtos from './containers/Produtos'
import Produto from './containers/Produto'
import ProdutosNovo from './containers/Produtos/NovoProduto'

import Categorias from "./containers/Categorias";
import Categoria from "./containers/Categoria";
import NovaCategoria from './containers/Categorias/NovaCategoria'

import Avaliacoes from './containers/Avaliacoes'
import Avaliacao from './containers/Avaliacao/index'

import Configuracoes from './containers/Configuracoes'

import Perfil from './containers/Perfil'

//CONTAINER SEM BASE
import Login from "./containers/Login";
import RecuperarSenha from "./containers/RecuperarSenha";
import ResetarSenha from "./containers/RecuperarSenha/ResetarSenha";

function App() {

  useEffect(()=>{
    initApp() 
  },[])


  return (
    <Provider store={store}>
      <Router>
        <AdminRoute path={"/"} exact component={Pedidos} />
        <AdminRoute path={"/pedido/:id"} exact component={Pedido} />

        <AdminRoute path={"/cliente/:id"} exact component={Cliente} />
        <AdminRoute path={"/clientes"} exact component={Clientes} />

        <AdminRoute path={"/produtos"} exact component={Produtos}/>
        <AdminRoute path={"/produto/:id"} exact component={Produto}/>
        <AdminRoute path={"/produtos/novo"} exact component={ProdutosNovo}/>

        <AdminRoute path={"/avaliacoes/:id"} exact component={Avaliacoes}/>
        <AdminRoute path={"/avaliacao/:id"} exact component={Avaliacao}/>

        <AdminRoute path={"/configuracoes"} exact component={Configuracoes}/>
        
        <AdminRoute path={"/perfil"} exact component={Perfil}/>


        <AdminRoute path={"/categorias"} exact component={Categorias} />
        <AdminRoute path={"/categoria/:id"} exact component={Categoria} />
        <AdminRoute path={"/categorias/nova"} exact component={NovaCategoria} />


        <Route path="/login" component={Login} />
        <Route path="/recuperar-senha" component={RecuperarSenha} />
        <Route path="/resetar-senha/:id" component={ResetarSenha} />
      </Router>
    </Provider>
  );
}

export default App;
