import React from 'react';

import {  BrowserRouter, Switch, Route, Redirect} from 'react-router-dom';

// IMPORTS ADMIN
import Dashboard from './pages/admin/dashboard';

import Produtos from './pages/admin/produtos';
import ProdutoEditar from './pages/admin/produtos/produtos.editar';
import ProdutoCadastrar from './pages/admin/produtos/produtos.cadastrar'

import Usuarios from './pages/admin/usuarios';
import UsuarioEditar from './pages/admin/usuarios/usuarios.editar';
import UsuarioCadastrar from './pages/admin/usuarios/usuarios.cadastrar'

import Clientes from './pages/admin/clientes';
//import ClienteEditar from './pages/admin/clientes/clientes.editar';
//import ClienteCadastrar from './pages/admin/clientes/clientes.cadastrar'

// IMPORTS CLIENT
import Home from './pages/client/home';
import ProdutoDetails from './pages/client/produtos/produtos.details';
//import ClienteDetails from './pages/client/clientes/clientes.details';
import Login from './pages/admin/login';

import PrivateRoute from './services/wAuth';

export default function Routes(){

    return(
        <BrowserRouter>
            <Switch>
                {/* Rota Cliente */}
                <PrivateRoute path="/" exact component={Home} />
                <PrivateRoute path="/produtos/:idProduto" exact component={ProdutoDetails} />
                {/*<PrivateRoute path="/clientes/:idcliente" exact component={ClienteDetails} />*/}

                {/* Rota Admin */}
                <Route path="/admin/login" exact component={Login} />
                <PrivateRoute path="/admin" exact component={Dashboard} />
                
                <PrivateRoute path="/admin/produtos" exact component={Produtos} />
                <PrivateRoute path="/admin/produtos/cadastrar" exact component={ProdutoCadastrar} />
                <PrivateRoute path="/admin/produtos/editar/:idProduto" exact component={ProdutoEditar} />

                <PrivateRoute path="/admin/usuarios" exact component={Usuarios} />
                <PrivateRoute path="/admin/usuarios/cadastrar" exact component={UsuarioCadastrar} />
                <PrivateRoute path="/admin/usuarios/editar/:idUsuario" exact component={UsuarioEditar} />

                <PrivateRoute path="/admin/clientes" exact component={Clientes} />
                {/*<PrivateRoute path="/admin/clientes/cadastrar" exact component={ClienteCadastrar} />
                <PrivateRoute path="/admin/clientes/editar/:idCliente" exact component={ClienteEditar} />*/}

            </Switch>
        </BrowserRouter>
    )
}