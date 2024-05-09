import DAO_Fornecedor from "../persistencia/DAO_Fornecedor.js"

export default class Fornecedor {
    #nome; #cnpj; #telefone; #email; #endereco;
    constructor(nome="", cnpj="", telefone="", email="", endereco="") {
        this.#nome = nome;
        this.#cnpj = cnpj;
        this.#telefone = telefone;
        this.#email = email;
        this.#endereco = endereco
    }

    get nome() {return this.#nome;}
    get cnpj() {return this.#cnpj;}
    get telefone() {return this.#telefone;}
    get email() {return this.#email;}
    get endereco() {return this.#endereco;}

    set nome(novoNome) {this.#nome = novoNome;}
    set cnpj(novocnpj) {this.#cnpj = novocnpj;}
    set telefone(novoTelefone) {this.#telefone = novoTelefone;}
    set email(novoEmail) {this.#email = novoEmail;}
    set endereco(novoEndereco) {this.#endereco = novoEndereco;}


    //########### *** ##########//
    toJSON() {
        return {
            "nome": this.#nome,
            "cnpj": this.#cnpj,
            "telefone": this.#telefone,
            "email": this.#email,
            "endereco": this.#endereco
        }
    }

    async adicionar() {
        const fornecedorDAO = new DAO_Fornecedor();
        await fornecedorDAO.adicionar(this);
    }

    async remover() {
        const fornecedorDAO = new DAO_Fornecedor();
        await fornecedorDAO.remover(this);
    }

    async alterar(){
        const fornecedorDAO = new DAO_Fornecedor();
        await fornecedorDAO.alterar(this);
    }

    async buscarAll() {
        const fornecedorDAO = new DAO_Fornecedor();
        return await fornecedorDAO.buscarAll();
    }

    async consultar(termo) {
        const fornecedorDAO = new DAO_Fornecedor();
        return await fornecedorDAO.consultar(termo);
    }
}