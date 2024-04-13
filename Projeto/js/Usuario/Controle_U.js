class UsuarioCtrl{
    
    validar(usuario,email,senha,senha_confirmacao,perfil){
        if(usuario !== "" && email !== "" && this.validarEmail(email) != false &&
            senha !== "" && senha == senha_confirmacao && perfil !== "")
        {
            
            const usuarioMod = new Usuario(usuario,email,senha,perfil);
            usuarioMod.incluir();
            return true;
        }
        else{
            return false;
        }
    }

    buscarUsuarios(){
        const usuario = new Usuario();
        return usuario.consultar();
    }

    removerUsuario(usuario){
        const usuarioRemov = new Usuario();
        usuarioRemov.usuario = usuario;
        usuarioRemov.excluir();
    }

    verificar(usuario){
        const listaUsuarios = this.buscarUsuarios();
        const existente = listaUsuarios.filter((existente) => {
            return existente.usuario == usuario;
        })

        if(existente.length > 0){
            return true;
        }
        else{
            return false;
        }
    }

    validarEmail(email){
        const regex = /^[a-zA-Z0-9._-]+@(gmail\.com|hotmail\.com|outlook\.com)$/;
        return regex.test(email);
    }
}