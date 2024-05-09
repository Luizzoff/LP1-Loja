import express from 'express';

const app = express();
const host = "0.0.0.0";
const porta = 8000;

app.use(express.static("../../Frontend"));

app.listen(porta, host, () => {
    console.log(`Servidor escutando em http://localhost:${porta}/templates/index.html`)
});