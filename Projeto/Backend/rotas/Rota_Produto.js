import { Router } from 'express';
import Controle_Produto from "../controle/Controle_Produto.js";

const produtoCtrl = new Controle_Produto();
const rota = Router();

rota.get("/",produtoCtrl.buscarAll)
rota.get("/:codigo", produtoCtrl.consultar)

rota.post("/", produtoCtrl.gravar)

rota.put("/:codigo", produtoCtrl.atualizar)
rota.patch("/:codigo", produtoCtrl.atualizar)

rota.delete("/:codigo", produtoCtrl.excluir)

export default rota;