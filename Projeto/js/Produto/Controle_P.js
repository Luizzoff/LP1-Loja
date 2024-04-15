class Controle_Produto {
    validar(codigo, descricao, precoCusto, precoVenda,qtdEstoque,urlImagem,dataValidade) 
    {
        if (this.alertaCodigo(codigo) && !this.buscarCodigo(codigo) && this.alertaDescricao(descricao) &&
            this.alertaPrecoCusto(precoCusto) && this.alertaPrecoVenda(precoVenda) &&
            this.alertaQtdEstoque(qtdEstoque) && this.alertaUrlImagem(urlImagem) &&
            this.alertaDataValidade(dataValidade))
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

    alertaCodigo(codigo) {
        if (codigo === 0 || codigo === "") {
            return false;
        } else {
            return true;
        }
    }
    alertaDescricao(descricao) {
        if (descricao === "") {
            return false;
        } else {
            return true;
        }
    }
    alertaPrecoCusto(precoCusto) {
        if (precoCusto === "" || isNaN(precoCusto) || precoCusto <= 0) {
            return false;
        } else {
            return true;
        }
    }
    alertaPrecoVenda(precoVenda) {
        if (precoVenda === "" || isNaN(precoVenda) || precoVenda <= 0) {
            return false;
        } else {
            return true;
        }
    }
    alertaQtdEstoque(qtdEstoque) {
        if (qtdEstoque === "" || isNaN(qtdEstoque) || qtdEstoque < 0) {
            return false;
        } else {
            return true;
        }
    }
    alertaUrlImagem(urlImagem) {
        if (urlImagem === "") {
            return false;
        } else {
            return true;
        }
    }
    alertaDataValidade(dataValidade) {
        if (dataValidade === "") {
            return false;
        } else {
            return true;
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