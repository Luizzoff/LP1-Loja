import DAO_Usuario from "../persistencia/DAO_Usuario.js";

export default class Usuario {
    #nome; #email; #senha; #senha_confirmacao; #perfil;
    constructor(nome="",email="",senha="",senha_confirmacao="",perfil=""){
        this.#nome = nome;
        this.#email = email;
        this.#senha = senha;
        this.#senha_confirmacao = senha_confirmacao;
        this.#perfil = perfil;
    }

    get nome() {return this.#nome;}
    get email() {return this.#email;}
    get senha() {return this.#senha;}
    get senha_confirmacao() {return this.#senha;}
    get perfil() {return this.#perfil;}
    
    set nome(novoNome) {this.#nome = novoNome;}
    set email(novoEmail) {this.#email = novoEmail;}
    set senha(novaSenha) {this.#senha = novaSenha;}
    set senha_confirmacao(novaSenhaConfirmacao) {this.#senha_confirmacao = novaSenhaConfirmacao;}
    set perfil(novoPerfil) {this.#perfil = novoPerfil;}


    //########### *** ##########//
    toJSON(){
        return{
            "nome":this.#nome,
            "email":this.#email,
            "senha":this.#senha,
            "senha_confirmacao":this.#senha_confirmacao,
            "perfil":this.#perfil
        }
    }

    async gravar() {
        const usuarioDAO = new DAO_Usuario();
        await usuarioDAO.gravar(this); 
    }

    async excluir() {
        const usuarioDAO = new DAO_Usuario();
        await usuarioDAO.excluir(this);
    }

    async atualizar() {
        const usuarioDAO = new DAO_Usuario();
        await usuarioDAO.atualizar(this);
    }

    async buscarAll() {
        const usuarioDAO = new DAO_Usuario();
        return await usuarioDAO.buscarAll();
    }

    async consultar(termo) {
        const usuarioDAO = new DAO_Usuario();
        return await usuarioDAO.consultar(termo);
    }
}