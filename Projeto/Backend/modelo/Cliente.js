import DAO_Cliente from "../persistencia/DAO_Cliente.js";

export default class Cliente {
    #nome; #cpf; #genero; #dataNascimento; #telefone; #email; #endereco;
    constructor(nome="", cpf="", genero="", dataNascimento="", telefone="", email="", endereco="") {
        this.#nome = nome;
        this.#cpf = cpf;
        this.#genero = genero;
        this.#dataNascimento = dataNascimento; 
        this.#telefone = telefone;
        this.#email = email;
        this.#endereco = endereco
    }

    get nome() {return this.#nome;}
    get cpf() {return this.#cpf;}
    get genero() {return this.#genero;}
    get dataNascimento() {return this.#dataNascimento;}
    get telefone() {return this.#telefone;}
    get email() {return this.#email;}
    get endereco() {return this.#endereco;}

    set nome(novoNome) {this.#nome = novoNome;}
    set cpf(novoCpf) {this.#cpf = novoCpf;}
    set genero(novoGenero) {this.#genero = novoGenero;}
    set dataNascimento(novaDataNascimento) {this.#dataNascimento = novaDataNascimento;}
    set telefone(novoTelefone) {this.#telefone = novoTelefone;}
    set email(novoEmail) {this.#email = novoEmail;}
    set endereco(novoEndereco) {this.#endereco = novoEndereco;}


    //########### *** ##########//
    toJSON() {
        return {
            "nome": this.#nome,
            "cpf": this.#cpf,
            "genero": this.#genero,
            "dataNascimento": this.#dataNascimento, 
            "telefone": this.#telefone,
            "email": this.#email,
            "endereco": this.#endereco
        }
    }
    async adicionar() {
        const clienteDAO = new DAO_Cliente();
        await clienteDAO.adicionar(this);
    }

    async remover() {
        const clienteDAO = new DAO_Cliente();
        await clienteDAO.remover(this);
    }

    async alterar(){
        const clienteDAO = new DAO_Cliente();
        await clienteDAO.alterar(this);
    }

    async buscarAll() {
        const clienteDAO = new DAO_Cliente();
        return await clienteDAO.buscarAll();
    }

    async consultar(termo){
        const clienteDAO = new DAO_Cliente();
        return await clienteDAO.consultar(termo);
    }
}