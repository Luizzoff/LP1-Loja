class DAO_Fornecedores {
    #ArmazenamentoLocal;
    constructor() {
        this.#ArmazenamentoLocal = window.localStorage;
        if (this.#ArmazenamentoLocal.getItem('listaFornecedores') === null) {
            this.#ArmazenamentoLocal.setItem('listaFornecedores',JSON.stringify([]));
        }
    }

    adicionar(Fornecedores) {
        if(Fornecedores instanceof Modelo_Fornecedores) {
            const listaFornecedoresAtualizada = JSON.parse(this.#ArmazenamentoLocal.getItem('listaFornecedores'));
            listaFornecedoresAtualizada.push(Fornecedores.toJSON());
            this.#ArmazenamentoLocal.setItem('listaFornecedores', JSON.stringify(listaFornecedoresAtualizada));
        }
    }

    remover(Fornecedores) {
        if(Fornecedores instanceof Modelo_Fornecedores) {
            const listaFornecedores = JSON.parse(this.#ArmazenamentoLocal.getItem('listaFornecedores'));
            const listaFornecedoresAtualizada = listaFornecedores.filter( (itemLista) => {
                return itemLista.cnpj !== Fornecedores.cnpj;
            });
            this.#ArmazenamentoLocal.setItem('listaFornecedores', JSON.stringify(listaFornecedoresAtualizada));
        }        
    }

    buscarAll() {
        return JSON.parse(this.#ArmazenamentoLocal.getItem('listaFornecedores'));
    }
}