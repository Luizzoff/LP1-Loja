class ProdutoCtrl{

    validar(codigo, descricao, precoCusto, precoVenda,qtdEstoque,urlImagem,dataValidade){
        if (codigo !== 0 && descricao !== "" && (!isNaN(precoCusto) && precoCusto > 0) &&
           (!isNaN(precoVenda) && precoVenda > 0) && (!isNaN(qtdEstoque) && qtdEstoque >= 0) &&
           urlImagem !== "" && dataValidade !== ""
        ){
           
            const produto = new Produto(codigo, descricao, precoCusto, precoVenda, qtdEstoque,
                urlImagem,dataValidade);
            produto.incluir();
            return true;
        }
        else{
            return false;
           
        }

    }

    buscarProdutos(){
        const produto = new Produto();
        return produto.consultar();
    } 
    
    removerProduto(codigo){
        const produto = new Produto(codigo);
        produto.excluir();
    }
    
}