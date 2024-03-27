//DAO - Data Access Object
class ProdutoDAO{
    #localArmazenamento;
    
    //constructor
    constructor(){
        this.#localArmazenamento = window.localStorage;
        
        //se no armazenamento local não existir uma lista de produtos, então cria-se o item
        if (this.#localArmazenamento.getItem('listaProdutos') === null){
            this.#localArmazenamento.setItem('listaProdutos',JSON.stringify([]));
        }

    }

    incluir(produto){
        //Assegurar que o parâmetro seja realmente um produto
        if (produto instanceof Produto){
            const listaProdutos = JSON.parse(this.#localArmazenamento.getItem('listaProdutos'));
            listaProdutos.push(produto.toJSON());
            this.#localArmazenamento.setItem('listaProdutos',JSON.stringify(listaProdutos));
        }
    }

    consultar(termo){
        return JSON.parse(this.#localArmazenamento.getItem("listaProdutos"));
    }

    excluir(produto){
        if (produto instanceof Produto){
            //recuperar a lista do armazenamento local
            const listaProdutos = JSON.parse(this.#localArmazenamento.getItem('listaProdutos'));
            //remover o produto dessa lista
            //visitar cada um dos produtos da listaProdutos
            //verificar se é possível encontrar o produto de enésimo código
            //para todos os produtos que não coicidem com o código, mantenha na listaProdutos
            //caso contrário ignore-o
            //predicado é uma função que retorna true ou false
            const listaAtualizada = listaProdutos.filter((itemLista) =>{ 
                return itemLista.codigo !== produto.codigo
            });
            //devolver a lista atualizada para o armazenamento local
            this.#localArmazenamento.setItem('listaProdutos',JSON.stringify(listaAtualizada));
        }
    }
}