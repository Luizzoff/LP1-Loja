import { Router } from "express";
import Controle_Fornecedor from "../controle/Controle_Fornecedor.js";

const fornecedorCtrl = new Controle_Fornecedor();
const rota = Router();

rota.get("/",fornecedorCtrl.buscarAll)
.get("/:cnpj", fornecedorCtrl.consultar)
.post("/", fornecedorCtrl.adicionar)
.put("/:cnpj", fornecedorCtrl.alterar)
.patch("/:cnpj", fornecedorCtrl.alterar)
.delete("/:cnpj", fornecedorCtrl.remover);

export default rota;