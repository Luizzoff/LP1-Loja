import { Router } from "express";
import Controle_Usuario from "../controle/Controle_Usuario.js";

const usuarioCtrl = new Controle_Usuario();
const rota = Router();

rota.get("/",usuarioCtrl.buscarAll)
.get("/:email", usuarioCtrl.consultar)
.post("/", usuarioCtrl.adicionar)
.put("/:email", usuarioCtrl.alterar)
.patch("/:email", usuarioCtrl.alterar)
.delete("/:email", usuarioCtrl.remover);

export default rota;