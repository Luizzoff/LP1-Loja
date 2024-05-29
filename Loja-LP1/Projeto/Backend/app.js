import rotaProduto from './rotas/Rota_Produto.js';
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
app.use('/produtos', rotaProduto);

//########## PASTAS DISPONIBILIZADAS ##########//
app.use(express.static("../Frontend"));

//########## SERVIDOR ##########//
app.listen(porta, host, () => {
    console.log(`Servidor escutando em http://localhost:${porta}/templates/Cadastro_Produto.html`)
});