import Produto from "../modelo/Produto.js";

export default class Controle_Produto {
    validar(codigo, descricao, precoCusto, precoVenda,qtdEstoque,urlImagem,dataValidade) 
    {
        if (!this.verificarCodigo(codigo) &&
            this.alertaCodigo(codigo) &&
            this.alertaDescricao(descricao) &&
            this.alertaPrecoCusto(precoCusto) &&
            this.alertaPrecoVenda(precoVenda) &&
            this.alertaQtdEstoque(qtdEstoque) &&
            this.alertaUrlImagem(urlImagem) &&
            this.alertaDataValidade(dataValidade))
        {
            const produto = new Produto(codigo, descricao, 
                                        precoCusto, precoVenda, 
                                        qtdEstoque, urlImagem,dataValidade);                                   
            produto.adicionar();
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
    

    //########## *** ##########//
    verificarCodigo(codigo){
        const listaProdutos = this.consultar(codigo);    

        if (listaProdutos.length != 0) {
            //Achei
            return true;
        } 
        else {
            //N achei
            return false;
        }
    }

    remover(codigo) {
        const produto = new Produto();
        produto.codigo = codigo;
        produto.remover();
    }

    //alterar(){}

    buscarAll() {
        const produto = new Produto();
        return produto.buscarAll();
    } 
    
    consultar(termo) {
        const produto = new Produto();
        return produto.consultar(termo);    
    }
}