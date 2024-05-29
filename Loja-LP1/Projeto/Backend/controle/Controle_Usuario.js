import Usuario from "../modelo/Usuario.js"

export default class Controle_Usuario{

    gravar(req, res) 
    {
        res.type("application/json");
        if (req.method == 'POST' && req.is("application/json"))
        {
            const nome  = req.body.nome;
            const email = req.body.email;
            const senha = req.body.senha;
            const senha_confirmacao = req.body.senha_confirmacao;
            const perfil  = req.body.perfil;

            if (req.method == 'POST')
            {
                const usuario = new Usuario(nome, email, senha, senha_confirmacao, perfil);                                   
                
                usuario.gravar()
                .then(()=>{
                    res.status(200).json({
                        "status":true,
                        "mensagem":"Usuario adicionado com sucesso!",
                        "email": usuario.email
                    });
                })
                .catch((erro)=>{
                    res.status(500).json({
                        "status":false,
                        "mensagem":"Erro ao incluir usuario: " + erro.message
                    });
                });
            }
            else {
                res.status(400).json({
                    "status":false,
                    "mensagem":"Erro: Não passou no if dos alert, Campos Invalidos!"
                });
            }
        } 
        else {
            res.status(400).json({
                "status":false,
                "mensagem":"Requisição inválida!, Metodo não é POST"
            });
        }
    }

    excluir(req, res)
    {
        res.type("application/json");
        if (req.method == 'DELETE')
        {
            const email = req.params.email;
            if (email)
            {
                const usuario = new Usuario();
                usuario.email = email;
                usuario.excluir()
                .then(()=>{
                    res.status(200).json({
                        "status":true,
                        "mensagem":"Usuario excluído com sucesso!",
                    });
                })
                .catch((erro)=>{
                    res.status(500).json({
                        "status":false,
                        "mensagem":"Erro ao excluir usuario: " + erro.message
                    });
                });
            }
            else {
                res.status(400).json({
                    "status":false,
                    "mensagem":"Erro: Não passou no if dos alert!"
                });
            }
        }
        else {
            res.status(400).json({
                "status":false,
                "mensagem":"Requisição inválida!, Metodo não é DELETE"
            });
        }
    }


    atualizar(req, res)
    {
        res.type("application/json");
        if ((req.method == 'PUT' || req.method == 'PATCH') && req.is("application/json")){
            const nome  = req.body.nome;
            const email = req.body.email;
            const senha = req.body.senha;
            const senha_confirmacao = req.body.senha_confirmacao;
            const perfil  = req.body.perfil;

            if (nome && email && senha && senha_confirmacao && perfil)
            {
                const usuario = new Usuario(nome, email, senha, senha_confirmacao, perfil);
                usuario.atualizar()
                .then(()=>{
                    res.status(200).json({
                        "status":true,
                        "mensagem":"Usuario alterado com sucesso!",
                    });
                })
                .catch((erro)=>{
                    res.status(500).json({
                        "status":false,
                        "mensagem":"Erro ao atualizar o usuario: " + erro.message
                    });
                });
            }
            else {
                res.status(400).json({
                    "status":false,
                    "mensagem":"Erro: Não passou no if dos alert!"
                });
            }
        }
        else {
            res.status(400).json({
                "status":false,
                "mensagem":"Requisição inválida!, Metodo não é PUT ou PATCH"
            });
        }    
    }

    buscarAll(req, res)
    {
        res.type("application/json");
        if (req.method=="GET")
        {
            const usuario = new Usuario();
            usuario.buscarAll()
            .then((listaUsuario) =>{
                res.status(200).json(listaUsuario);
            })
            .catch((erro) => {
                res.status(500).json({
                    "status":false,
                    "mensagem":"Erro ao buscarAll produtos: " + erro.message    
                });
            });
        }
        else {
            res.status(400).json({
                "status":false,
                "mensagem":"Requisição inválida!, Metodo não é GET"
            });
        }
    }

    consultar(req, res)
    {
        res.type("application/json");
        if (req.method=="GET")
        {
            const email = req.params.email;
            if (email)
            {
                const usuario = new Usuario();
                usuario.consultar(codigo)
                .then((listaUsuario) =>{
                    res.status(200).json(listaUsuario);
                })
                .catch((erro) => {
                    res.status(500).json({
                        "status":false,
                        "mensagem":"Erro ao consultar usuario: " + erro.message    
                    });
                });
            }
            else {
                res.status(400).json({
                    "status":false,
                    "mensagem":"Consulta Invalida!, informe um codigo valido!"
                });
            }
        }
        else {
            res.status(400).json({
                "status":false,
                "mensagem":"Requisição inválida!, Metodo não é GET"
            });
        }    
    }
}