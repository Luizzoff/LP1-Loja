class Usuario{
    //Atributos privados

    #usuario;
    #email;
    #senha;
    #senha_confirmacao;
    #perfil;

    get usuario(){
        return this.#usuario;
    }

    set usuario(novoUsuario){
        this.#usuario = novoUsuario;
    }

    get email(){
        return this.#email;
    }

    set email(novoEmail){
        this.#email = novoEmail;
    }

    get senha(){
        return this.#senha;
    }

    set senha(novaSenha){
        this.#senha = novaSenha;
    }

    get senha_confirmacao(){
        return this.#senha;
    }

    set senha_confirmacao(novaSenhaConfirm){
        this.#senha_confirmacao = novaSenhaConfirm;
    }

    get perfil(){
        return this.#perfil;
    }

    set perfil(novoPerfil){
        this.#perfil = novoPerfil;
    }

    constructor(usuario="",email="",senha="",senha_confirmacao="",perfil=""){
        this.#usuario = usuario;
        this.#email = email;
        this.#senha = senha;
        this.#senha_confirmacao = senha_confirmacao;
        this.#perfil = perfil;
    }

    toJSON(){
        return{
            "usuario":this.#usuario,
            "email":this.#email,
            "senha":this.#senha,
            "senha_confirmacao":this.#senha_confirmacao,
            "perfil":this.#perfil
        }
    }

    incluir(){
        const usuaDAO = new UsuarioDAO();
        usuaDAO.incluir(this);
    }

    consultar(){
        const usuaDAO = new UsuarioDAO();
        return usuaDAO.consultar();
    }

    excluir(){
        const usuaDAO = new UsuarioDAO();
        usuaDAO.excluir(this);
    }
}