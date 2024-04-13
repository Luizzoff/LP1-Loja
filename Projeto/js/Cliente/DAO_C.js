class DAO_Cliente {
    #ArmazenamentoLocal;
    constructor() {
        this.#ArmazenamentoLocal = window.localStorage;
        if (this.#ArmazenamentoLocal.getItem('listaClientes') === null) {
            this.#ArmazenamentoLocal.setItem('listaClientes',JSON.stringify([]));
        }
    }

    adicionar(Cliente) {
        if(Cliente instanceof Modelo_Cliente) {
            const listaClientesAtualizada = JSON.parse(this.#ArmazenamentoLocal.getItem('listaClientes'));
            listaClientesAtualizada.push(Cliente.toJSON());
            this.#ArmazenamentoLocal.setItem('listaClientes', JSON.stringify(listaClientesAtualizada));
        }
    }

    remover(Cliente) {
        if(Cliente instanceof Modelo_Cliente) {
            const listaClientes = JSON.parse(this.#ArmazenamentoLocal.getItem('listaClientes'));
            const listaClientesAtualizada = listaClientes.filter( (itemLista) => {
                return itemLista.cpf !== Cliente.cpf;
            });
            this.#ArmazenamentoLocal.setItem('listaClientes', JSON.stringify(listaClientesAtualizada));
        }        
    }

    buscarAll() {
        return JSON.parse(this.#ArmazenamentoLocal.getItem('listaClientes'));
    }

    buscarCPF(Cliente) {
        if(Cliente instanceof Modelo_Cliente) {
            const listaClientes = JSON.parse(this.#ArmazenamentoLocal.getItem('listaClientes'));
            const listaAtualizada = listaClientes.filter( (itemLista) =>
                                    { return itemLista.cpf == Cliente.cpf; });
            
            if (listaAtualizada.length != 0) {
                return false;
            }
            else {
                return true;
            }
        }        
    }
}