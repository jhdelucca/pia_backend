const express = require('express');
const UserController = require('./controller/UserController');
const OrcamentoController = require('./controller/OrcamentoController');
const CentroCustoController = require('./controller/CentroCustoController');
const GastoController = require('./controller/GastoController');
const GastoDetalhadoController = require('./controller/GastoDetalhadoController');
const routes = express.Router();

routes.post("/usuarios" , UserController.create);
routes.post("/session" , UserController.logar);

routes.get("/orcamento" , OrcamentoController.index);
routes.post("/orcamento" , OrcamentoController.create);

routes.get('/centrocusto' , CentroCustoController.index);
routes.get('/centrocusto/:id' , CentroCustoController.indexUnico);
routes.post('/centrocusto', CentroCustoController.create);
routes.delete('/centrocusto/:id' , CentroCustoController.delete);
routes.put('/centrocusto/:id' , CentroCustoController.update);
routes.put('/centrocustovalor/:id' , CentroCustoController.updateValor);

routes.get('/gastos' , GastoController.index);
routes.get('/gastos/:id' , GastoController.indexUnico);
routes.post('/gastos', GastoController.create);
routes.delete('/gastos/:id' , GastoController.delete);
routes.put('/gastos/:id' , GastoController.update);
routes.put('/gastosvalor/:id' , GastoController.updateValor);

routes.post('/gastos-detalhados' , GastoDetalhadoController.create);
routes.get('/gastos-detalhados' , GastoDetalhadoController.index);
routes.get('/gastos-detalhados/:gasto_id' , GastoDetalhadoController.indexGasto);
routes.get('/gastos-detalhados-custo' , GastoDetalhadoController.indexGastoCusto);


module.exports = routes;