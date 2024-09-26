import { Router } from "express";
import Controle_Fornecedor from "../controle/Controle_Fornecedor.js";

const fornecedorCtrl = new Controle_Fornecedor();
const rota = Router();

rota.get("/",fornecedorCtrl.buscarAll)
.get("/:cnpj", fornecedorCtrl.consultar)
.post("/", fornecedorCtrl.gravar)
.put("/:cnpj", fornecedorCtrl.atualizar)
.patch("/:cnpj", fornecedorCtrl.atualizar)
.delete("/:cnpj", fornecedorCtrl.excluir);

export default rota;