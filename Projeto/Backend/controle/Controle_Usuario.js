import Usuario from "../modelo/Usuario.js"

export default class Controle_Usuario{
    validar(nome, email, senha, senha_confirmacao, perfil)
    {
        if (!this.verificarEmail(email) &&
            !this.validarUsuario(nome) &&
            this.validarEmail(email) &&
            !this.vazioSenha(senha) &&
            !this.vazioSenhaConfirmacao(senha_confirmacao) &&
            !this.validarSenha(senha,senha_confirmacao) &&
            !this.validarPerfil(perfil) )
        {          
            const usuario = new Usuario(nome, email, senha, senha_confirmacao, perfil);
            usuario.adicionar();
            return true;
        }
        else{
            return false;
        }
    }

    validarUsuario(nome){
        if (nome === "") {
            return true;
        } else {
            return false;
        }
    }
    validarEmail(email){
        const regex = /^[a-zA-Z0-9._-]+@(gmail\.com|hotmail\.com|outlook\.com)$/;
        return regex.test(email);
    }
    validarSenha(senha,senha_confirmacao){
        if (senha !== senha_confirmacao) {
            return true;
        } else {
            return false;
        }
    }
    vazioSenha(senha){
        if(senha === ""){
            return true;
        }
        else{
            return false;
        }
    }
    vazioSenhaConfirmacao(senha_confirmacao){
        if(senha_confirmacao === ""){
            return true;
        }
        else{
            return false;
        }
    }   
    validarPerfil(perfil){
        if (perfil === "") {
            return true;
        } else {
            return false;
        }
        
    }
    
    
    //########### *** ##########//
    verificarEmail(email){
        const listaUsuarios = this.consultar(email);    

        if (listaUsuarios.length != 0) {
            //Achei
            return true;
        } 
        else {
            //N achei
            return false;
        }
    }

    remover(email){
        const usuario = new Usuario();
        usuario.email = email;
        usuario.remover();
    }

    //alterar(){}

    buscarAll(){
        const usuario = new Usuario();
        return usuario.consultar();
    }

    consultar(termo){
        const usuario = new Usuario();
        return usuario.consultar(termo);
    }
}