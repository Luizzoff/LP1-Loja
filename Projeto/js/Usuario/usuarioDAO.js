class UsuarioDAO{
    #localArmazenamento
    
    constructor(){
        this.#localArmazenamento = window.localStorage;

        if(this.#localArmazenamento.getItem('listaUsuarios') === null){
            this.#localArmazenamento.setItem('listaUsuarios',JSON.stringify([]));
        }
    }

    incluir(usuarioIncl){    
        if(usuarioIncl instanceof Usuario){
            const listaUsuario = JSON.parse(this.#localArmazenamento.getItem('listaUsuarios'));
            listaUsuario.push(usuarioIncl.toJSON());
            this.#localArmazenamento.setItem('listaUsuarios',JSON.stringify(listaUsuario));
        }
    }

    consultar(){
        return JSON.parse(this.#localArmazenamento.getItem('listaUsuarios'));
    }

    excluir(emailExcl){
        if(emailExcl instanceof Usuario){
            const listaUsuario = JSON.parse(this.#localArmazenamento.getItem('listaUsuarios'));
            const listaAtualizada = listaUsuario.filter((itemLista) =>{
                return itemLista.email !== emailExcl.email;
            });
            this.#localArmazenamento.setItem('listaUsuarios',JSON.stringify(listaAtualizada));
        }
    }
}