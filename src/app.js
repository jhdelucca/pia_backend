const express = require('express');
const routes = require('./routes');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(process.env.PORT || 3333);
console.log("porta 3333 ativada");

module.exports = app;