import {combineReducers} from 'redux'
import authReducer from './auth_reducer'
import pedidoReducer from './pedidos_reducer'
import clienteReducer from './cliente_reducer'
import categoriaReducer from './categorias_reducer'
import produtosReducer from './produtos_reducer'
import variacoesReducer from './variacao_reducer'
import avaliacoesReducer from './avaliacoes_reducer'
import configuracaoReducer from './configuracoes_reducer'

const reducers = combineReducers({
    auth: authReducer,
    pedido:pedidoReducer,
    cliente:clienteReducer,
    categoria:categoriaReducer,
    produto:produtosReducer,
    variacao:variacoesReducer,
    avaliacao:avaliacoesReducer,
    configuracao:configuracaoReducer
})

export default reducers