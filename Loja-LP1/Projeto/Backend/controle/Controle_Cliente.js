import Cliente from "../modelo/Cliente.js";

export default class Controle_Cliente {
    gravar(req, res){
        res.type("application/json");
        if(req.method == 'POST' && req.is("application/json")){
            const nome = req.body.nome; 
            const cpf = req.body.cpf;
            const genero = req.body.genero;
            const dataNascimento = req.body.dataNascimento;
            const telefone = req.body.telefone;
            const email = req.body.email;
            const endereco = req.body.endereco;

            if(nome && cpf && genero && dataNascimento && telefone && email && endereco)
            {
                const cliente = new Cliente(nome,cpf,genero,dataNascimento,telefone,email,endereco)

                cliente.gravar()
                .then(()=>{
                    res.status(200).json({
                        "status":true,
                        "mensagem":"Cliente adicionado com sucesso!",
                        "cpf": cliente.cpf
                    });
                })
                .catch((erro)=>{
                    res.status(500).json({
                        "status":false,
                        "mensagem":"Erro ao incluir cliente: " + erro.message
                    });
                });
            }
            else{
                res.status(400).json({
                    "status":false,
                    "mensagem":"Erro: Não passou no if dos alert, Campos Invalidos!"
                });
            }
        }
        else{
            res.status(400).json({
                "status":false,
                "mensagem":"Requisição inválida! Metedo não é POST"
            });
        }
    }

    excluir(req, res){
        res.type("application/json");
        if(req.method == 'DELETE'){
            const cpf = req.params.cpf;
            if(cpf){
                const cliente = new Cliente();
                cliente.cpf = cpf;
                cliente.excluir()
                .then(()=>{
                    res.status(200).json({
                        "status":true,
                        "mensagem":"Cliente excluído com sucesso!",
                    });
                })
                .catch((erro)=>{
                    res.status(500).json({
                        "status":false,
                        "mensagem":"Erro ao excluir clientes: " + erro.message
                    });
                });
            }
            else{
                res.status(400).json({
                    "status":false,
                    "mensagem":"Erro: Não passou no if dos alert!"
                });
            }
        }
        else{
            res.status(400).json({
                "status":false,
                "mensagem":"Requisição inválida!, Metodo não é DELETE"
            })
        }
    }

    atualizar(req,res){
        res.type("application/json");
        if((req.method == 'PUT' || req.method == 'PATCH') && req.is("application/json")){
            const nome = req.body.nome; 
            const cpf = req.body.cpf;
            const genero = req.body.genero;
            const dataNascimento = req.body.dataNascimento;
            const telefone = req.body.telefone;
            const email = req.body.email;
            const endereco = req.body.endereco;

            
            if(nome && cpf && genero && dataNascimento && telefone && email && endereco){
                
                const cliente = new Cliente(nome,cpf,genero,dataNascimento,telefone,email,endereco);
                cliente.atualizar()
                .then(() =>{
                    res.status(200).json({
                        "status":true,
                        "mensagem":"Cliente alterado com sucesso!",
                    });
                })
                .catch((erro) =>{
                    res.status(500).json({
                        "status":false,
                        "mensagem":"Erro ao atualizar o cliente: " + erro.message
                    });
                });
            }
            else{
                res.status(400).json({
                    "status":false,
                    "mensagem":"Erro: Não passou no if dos alert!"
                });
            }
        }
        else{
            res.status(400).json({
                "status":false,
                "mensagem":"Requisição inválida!, Metodo não é PUT ou PATCH"
            });
        }
    }
    
    buscarAll(req, res) {
        res.type("application/json");
        if (req.method=="GET")
        {
            const cliente = new Cliente();
            cliente.buscarAll()
            .then((listaClientes) =>{
                res.status(200).json(listaClientes);
            })
            .catch((erro) => {
                res.status(500).json({
                    "status":false,
                    "mensagem":"Erro ao buscarAll clientes: " + erro.message    
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

    consultar(req, res) {
        res.type("application/json");
        if (req.method=="GET")
        {
            const cpf = req.params.cpf;
            if (cpf)
            {
                const cliente = new Cliente();
                cliente.consultar(cpf)
                .then((listaClientes) =>{
                    res.status(200).json(listaClientes);
                })
                .catch((erro) => {
                    res.status(500).json({
                        "status":false,
                        "mensagem":"Erro ao consultar clientes: " + erro.message    
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