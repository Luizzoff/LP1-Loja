//DAO - Data Access Object
class DAO_Produto{
    #ArmazenamentoLocal;
    //#################### Constrói o Local de Armazenamento ####################
    constructor() {
        this.#ArmazenamentoLocal = window.localStorage;
        //se no armazenamento local não existir uma lista de produtos, então cria-se o item
        if (this.#ArmazenamentoLocal.getItem('listaProdutos') === null) {
            //converte o armazenamento local que começa como uma string para o formato JSON
            this.#ArmazenamentoLocal.setItem('listaProdutos',JSON.stringify([]));
        }
    }
    //##########################################################################

    //=============================================================================================

    //#################### Funções Solicitadas pelo Modelo_Produto ####################
    adicionar(Produto) {
        //Assegurar que o parâmetro seja realmente um produto
        if (Produto instanceof Modelo_Produto) {
            //converte o JSON para um objeto para que possa ser manipulado
            const listaProdutos = JSON.parse(this.#ArmazenamentoLocal.getItem('listaProdutos'));
            /*Insere um novo produto, mas antes precisa ser convertido para o padrão predefinido
              ao estilo do JSON que esta em Modelo_Produto*/
            listaProdutos.push(Produto.toJSON());
            //converte o objeto de volta para o formato JSON e reatualiza a lista de produtos
            this.#ArmazenamentoLocal.setItem('listaProdutos',JSON.stringify(listaProdutos));
        }
    }
    
    remover(Produto) {
        if (Produto instanceof Modelo_Produto) {
            //recuperar a lista do armazenamento local
            const listaProdutos = JSON.parse(this.#ArmazenamentoLocal.getItem('listaProdutos'));
            const listaAtualizada = listaProdutos.filter( (itemLista) => 
                                    { return itemLista.codigo !== Produto.codigo } );
            //devolver a lista atualizada para o armazenamento local
            this.#ArmazenamentoLocal.setItem('listaProdutos',JSON.stringify(listaAtualizada));
        }
    }

    buscar() {
        //Retorna toda a lista de produtos
        return JSON.parse(this.#ArmazenamentoLocal.getItem("listaProdutos"));
    }
}