import { Router } from "express";
import Controle_Cliente from "../controle/Controle_Cliente.js";

const clienteCtrl = new Controle_Cliente();
const rota = Router();

rota.get("/",clienteCtrl.buscarAll)
.get("/:cpf", clienteCtrl.consultar)
.post("/", clienteCtrl.adicionar)
.put("/:cpf", clienteCtrl.alterar)
.patch("/:cpf", clienteCtrl.alterar)
.delete("/:cpf", clienteCtrl.remover);

export default rota;