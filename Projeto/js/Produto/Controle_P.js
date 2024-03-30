class Controle_Produto {
    validar(codigo, descricao, precoCusto, precoVenda,qtdEstoque,urlImagem,dataValidade) 
    {
        if (codigo !== 0 && descricao !== "" &&
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

    buscar() {
        //busca todos os produtos, por isso não recebe um codigo especifico
        const ProdutoMDL = new Modelo_Produto();
        return ProdutoMDL.buscar();
    } 
    
}