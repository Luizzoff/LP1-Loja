import rotaClientes from './rotas/Rota_Cliente.js';
import rotaFornecedores from './rotas/Rota_Fornecedor.js';
import rotaProduto from './rotas/Rota_Produto.js';
import rotaUsuarios from './rotas/Rota_Usuario.js';
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
app.use('/clientes', rotaClientes);
app.use('/fornecedores', rotaFornecedores);
app.use('/produtos', rotaProduto);
app.use('/usuarios', rotaUsuarios);

//########## PASTAS DISPONIBILIZADAS ##########//
app.use(express.static("../Frontend"));

//########## SERVIDOR ##########//
app.listen(porta, host, () => {
    console.log(`Servidor escutando em http://localhost:${porta}/templates/Cadastro_Produto.html`)
});