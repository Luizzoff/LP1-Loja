class UsuarioCtrl{
    validar(usuario,email,senha,senha_confirmacao,perfil){
        if(!this.validarUsuario(usuario) && !this.verificar(email) &&
            this.validarEmail(email) && !this.vazioSenha(senha) && 
            !this.vazioSenhaConfirmacao(senha_confirmacao) && !this.validarSenha(senha,senha_confirmacao) &&
            !this.validarPerfil(perfil))
        {          
            const usuarioMod = new Usuario(usuario,email,senha,senha_confirmacao,perfil);
            usuarioMod.incluir();
            return true;
        }
        else{
            return false;
        }
    }

    validarUsuario(usuario){
        if (usuario === "") {
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

    buscarUsuarios(){
        const usuario = new Usuario();
        return usuario.consultar();
    }

    removerUsuario(email){
        const usuarioRemov = new Usuario();
        usuarioRemov.email = email;
        usuarioRemov.excluir();
    }

    verificar(email){
        const listaUsuarios = this.buscarUsuarios();
        const existente = listaUsuarios.filter((existente) => {
            return existente.email == email;
        })

        if(existente.length > 0){
            return true;
        }
        else{
            return false;
        }
    }
}