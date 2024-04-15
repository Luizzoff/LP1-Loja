class Modelo_Fornecedores {
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

    toJSON() {
        return {
            "nome": this.#nome,
            "cnpj": this.#cnpj,
            "telefone": this.#telefone,
            "email": this.#email,
            "endereco": this.#endereco
        }
    }
    adicionar() {
        const FornecedoresDAO = new DAO_Fornecedores();
        FornecedoresDAO.adicionar(this);
    }

    remover() {
        const FornecedoresDAO = new DAO_Fornecedores();
        FornecedoresDAO.remover(this);
    }

    buscarAll() {
        const FornecedoresDAO = new DAO_Fornecedores();
        return FornecedoresDAO.buscarAll();
    }
}