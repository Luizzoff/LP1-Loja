import { Router } from "express";
import Controle_Usuario from "../controle/Controle_Usuario.js";

const usuarioCtrl = new Controle_Usuario();
const rota = Router();

rota.get("/",usuarioCtrl.buscarAll)
.get("/:email", usuarioCtrl.consultar)
.post("/", usuarioCtrl.gravar)
.put("/:email", usuarioCtrl.atualizar)
.patch("/:email", usuarioCtrl.atualizar)
.delete("/:email", usuarioCtrl.excluir);

export default rota;