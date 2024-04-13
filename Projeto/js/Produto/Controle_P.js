class Controle_Produto {
    validarAll(codigo, descricao, precoCusto, precoVenda,qtdEstoque,urlImagem,dataValidade) 
    {
        if (codigo !== 0 && codigo!=="" && descricao !== "" &&
           (!isNaN(precoCusto) && precoCusto > 0) &&
           (!isNaN(precoVenda) && precoVenda > 0) &&
           (!isNaN(qtdEstoque) && qtdEstoque >= 0) &&
           urlImagem !== "" && dataValidade !== "")
        {
            const ProdutoMDL = new Modelo_Produto(codigo, descricao, precoCusto, precoVenda, 
                                                    qtdEstoque, urlImagem,dataValidade);                                   
            ProdutoMDL.adicionar();
            return true;
        }
        else {
            return false;  
        }
    }
    //##################################################################################

    //==========================================================================================================

    //#################### Funções Solicitadas pelo Cadastro_Produto ####################
    remover(codigo) {
        const ProdutoMDL = new Modelo_Produto(codigo);
        ProdutoMDL.remover();
    }

    buscarAll() {
        //busca todos os produtos, por isso não recebe um codigo especifico
        const ProdutoMDL = new Modelo_Produto();
        return ProdutoMDL.buscarAll();
    } 
    
    buscarCodigo(codigo) {
        const ProdutoMDL = new Modelo_Produto(codigo);
        return ProdutoMDL.buscarCodigo();
    }
}