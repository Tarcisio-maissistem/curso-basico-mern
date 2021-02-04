const express = require('express');

const routes = express.Router();

const Usuario = require('./controllers/usuarios.controller')
const Produto = require('./controllers/produtos.controller')
const Cliente = require('./controllers/clientes.controller')

routes.get('/',Usuario.index);

// Rotas de Usuários
routes.post('/api/usuarios',Usuario.create);
routes.get('/api/usuarios',Usuario.index);
routes.get('/api/usuarios.details/:_id',Usuario.details);
routes.delete('/api/usuarios/:_id',Usuario.delete);
routes.put('/api/usuarios',Usuario.update);
routes.post('/api/usuarios/login',Usuario.login);
routes.get('/api/usuarios/checktoken',Usuario.checkToken);
routes.get('/api/usuarios/destroytoken',Usuario.destroyToken);

// Rotas de Produtos
routes.post('/api/produtos',Produto.create);
routes.get('/api/produtos',Produto.index);
routes.get('/api/produtos.details/:_id',Produto.details);
routes.delete('/api/produtos/:_id',Produto.delete);
routes.put('/api/produtos',Produto.update);

// Rotas de Clientes
routes.post('/api/clientes',Cliente.create);
routes.get('/api/clientes',Cliente.index);
routes.get('/api/clientes.details/:_id',Cliente.details);
routes.delete('/api/clientes/:_id',Cliente.delete);
routes.put('/api/clientes',Cliente.update);

module.exports = routes;
