class Controle_Produto {
    validar(codigo, descricao, precoCusto, precoVenda,qtdEstoque,urlImagem,dataValidade) 
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
        const listaProdutos = this.buscarAll();

        const listaAtualizada = listaProdutos.filter( (itemLista) => 
                                { return itemLista.codigo == codigo } );
            
        if (listaAtualizada.length != 0) {
            //Achei
            return true;
        } 
        else {
            //N achei
            return false;
        }
    }
}