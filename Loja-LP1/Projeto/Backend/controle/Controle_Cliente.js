import Cliente from "../modelo/Cliente.js";

export default class Controle_Cliente {
    gravar(req, res){
        res.type("application/json");
        if(req.method == 'POST' && res.is("application/json")){
            const nome = req.body.nome; 
            const cpf = req.body.cpf;
            const genero = req.body.genero;
            const dataNascimento = req.body.dataNascimento;
            const telefone = req.body.telefone;
            const email = req.body.email;
            const endereco = req.body.endereco;

            if(!this.verificarCpf(cpf) && this.alertaNome(nome) &&
            this.alertaCpf(cpf) && this.alertaGenero(genero) &&
            this.alertaDataNascimento(dataNascimento) && this.alertaTelefone(telefone) &&
            this.alertaEmail(email) && this.alertaEndereco(endereco)){
                
                const cliente = new Cliente(nome,cpf,genero,dataNascimento,telefone,email,endereco)

                cliente.gravar()
                .then(()=>{
                    res.status(200).json({
                        "status":true,
                        "mensagem":"Cliente adicionado com sucesso!",
                        "codigo": cliente.codigo
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
            if(this.alertaCpf(cpf) && this.verificarCpf(cpf)){
                const cliente = new Cliente(cpf);
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

            if(!this.verificarCpf(cpf) && this.alertaNome(nome) &&
            this.alertaCpf(cpf) && this.alertaGenero(genero) &&
            this.alertaDataNascimento(dataNascimento) && this.alertaTelefone(telefone) &&
            this.alertaEmail(email) && this.alertaEndereco(endereco)){
                
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
            if (this.alertaCpf(cpf) && this.verificarCpf(cpf))
            {
                const cliente = new Cliente();
                cliente.consultar(codigo)
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

    alertaNome(nome) {
        if (nome === "" || !isNaN(nome)) {
            return false;
        } else {
            return true;
        }
    }
    alertaGenero(genero) {
        if (genero === "") {
            return false;            
        } else {
            return true;
        }
    }
    alertaDataNascimento(dataNascimento) {
        if (dataNascimento === "") {
            return false;            
        } else {
            return true;
        }
    }
    alertaCpf(cpf) {
        const regex_cpf = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
        return regex_cpf.test(cpf);
    }
    alertaTelefone(telefone) {
        const regex_tel = /^\(\d{2}\)\s*\d{4,5}-\d{4}$/;
        return regex_tel.test(telefone);
    }
    alertaEmail(email) {
        const regex_email = /^[a-zA-Z0-9._-]+@(gmail\.com|hotmail\.com|outlook\.com)$/;
        return regex_email.test(email);
    }
    alertaEndereco(endereco) {
        const regex_endereco = /^(Avenida|Rua|avenida|rua)\s(?:.*\s)?/;
        return regex_endereco.test(endereco);
    }
    
    
    //########## *** ##########//
    verificarCpf(cpf){
        const listaClientes = this.consultar(cpf);    

        if (listaClientes.length != 0) {
            //Achei
            return true;
        } 
        else {
            //N achei
            return false;
        }
    }

}