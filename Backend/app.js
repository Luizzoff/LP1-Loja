import rotaCliente from './rotas/Rota_Cliente.js';
import rotaFornecedor from './rotas/Rota_Fornecedor.js';
import rotaProduto from './rotas/Rota_Produto.js';
import rotaUsuario from './rotas/Rota_Usuario.js';
import express from 'express';
import cors from 'cors';

const host = "0.0.0.0";
const porta = 3000;
const app = express();

//########## MIDDLEWARE e CORS ##########//
app.use(express.json());
app.use(cors({
    origin:"*",
    "Access-Control-Allow-Origin":"*"
}));

//########## ROTAS ##########//
app.use('/clientes', rotaCliente);
app.use('/fornecedores', rotaFornecedor);
app.use('/produtos', rotaProduto);
app.use('/usuarios', rotaUsuario);

//########## PASTAS DISPONIBILIZADAS ##########//
app.use(express.static("../Frontend"));

//########## SERVIDOR ##########//
app.listen(porta, host, () => {
    console.log(`Servidor escutando em http://localhost:${porta}/templates/Index.html`)
});

//##### PM2 #####//
/*  npm install pm2 --save
    "pm2-restart": "pm2 restart servidor",
    "pm2-stop": "pm2 stop servidor",
    "pm2-start": "pm2 start app.js --name servidor",
*/