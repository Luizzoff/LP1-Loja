import { Router } from "express";
import Controle_Cliente from "../controle/Controle_Cliente.js";

const clienteCtrl = new Controle_Cliente();
const rota = Router();

rota.get("/",clienteCtrl.buscarAll)
.get("/:cpf", clienteCtrl.consultar)
.post("/", clienteCtrl.gravar)
.put("/:cpf", clienteCtrl.atualizar)
.patch("/:cpf", clienteCtrl.atualizar)
.delete("/:cpf", clienteCtrl.excluir);

export default rota;