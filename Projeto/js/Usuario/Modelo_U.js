class Usuario{
    //Atributos privados

    #usuario;
    #email;
    #senha;
    #perfil;

    get nome(){
        return this.#usuario;
    }

    set nome(novoUsuario){
        this.#usuario = novoUsuario;
    }

    get sobrenome(){
        return this.#email;
    }

    set sobrenome(novoEmail){
        this.#email = novoEmail;
    }

    get idade(){
        return this.#senha;
    }

    set idade(novaSenha){
        this.#senha = novaSenha;
    }

    get cidade(){
        return this.#perfil;
    }

    set cidade(novoPerfil){
        this.#perfil = novoPerfil;
    }

    constructor(usuario="",email="",senha="",perfil=""){
        this.#usuario = usuario;
        this.#email = email;
        this.#senha = senha;
        this.#perfil = perfil;
    }

    toJSON(){
        return{
            "usuario":this.#usuario,
            "email":this.#email,
            "senha":this.#senha,
            "perfil":this.#perfil,
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