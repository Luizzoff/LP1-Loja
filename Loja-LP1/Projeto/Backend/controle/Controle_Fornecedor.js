import Fornecedor from "../modelo/Fornecedor.js";

export default class Controle_Fornecedor {
    gravar(req, res) 
    {
        res.type("application/json");
        if (req.method == 'POST' && req.is("application/json"))
        {
            const nome  = req.body.nome;
            const cnpj = req.body.cnpj;
            const telefone = req.body.telefone;
            const email = req.body.email;
            const endereco  = req.body.endereco;

            if (!this.verificarCnpj(cnpj) &&
            this.alertaNome(nome) &&
            this.alertaCnpj(cnpj) &&
            this.alertaTelefone(telefone) &&
            this.alertaEmail(email) &&
            this.alertaEndereco(endereco)) 
        {
                const fornecedor = new Fornecedor(nome, cnpj, telefone, email, endereco);                                   
                
                fornecedor.gravar()
                .then(()=>{
                    res.status(200).json({
                        "status":true,
                        "mensagem":"Fornecedor adicionado com sucesso!",
                        "codigo": fornecedor.codigo
                    });
                })
                .catch((erro)=>{
                    res.status(500).json({
                        "status":false,
                        "mensagem":"Erro ao incluir fornecedor: " + erro.message
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
            const cpnj = req.params.cpnj;
            if (this.alertaCnpj(cnpj) && this.verificarCnpj(cnpj))
            {
                const cliente = new Produto(cpnj);
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
                        "mensagem":"Erro ao excluir cliente: " + erro.message
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
            const cnpj = req.body.cnpj;
            const telefone = req.body.telefone;
            const email = req.body.email;
            const endereco  = req.body.endereco;

            if (!this.verificarCnpj(cnpj) &&
            this.alertaNome(nome) &&
            this.alertaCnpj(cnpj) &&
            this.alertaTelefone(telefone) &&
            this.alertaEmail(email) &&
            this.alertaEndereco(endereco)) 
            {
                const cliente = new Cliente(nome, cnpj, telefone, email, endereco);
                cliente.atualizar()
                .then(()=>{
                    res.status(200).json({
                        "status":true,
                        "mensagem":"Cliente alterado com sucesso!",
                    });
                })
                .catch((erro)=>{
                    res.status(500).json({
                        "status":false,
                        "mensagem":"Erro ao atualizar o cliente: " + erro.message
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
            const clientes = new Clientes();
            clientes.buscarAll()
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

    consultar(req, res)
    {
        res.type("application/json");
        if (req.method=="GET")
        {
            const cpnj = req.params.cpnj;
            if (this.alertaCnpj(cnpj) && this.verificarCnpj(cnpj))
            {
                const clientes = new Clientes();
                clientes.consultar(cnpj)
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
    alertaCnpj(cnpj) {
        const regex_cnpj = /^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/;
        return regex_cnpj.test(cnpj);
    }
    alertaTelefone(telefone) {
        const regex_tel = /^\(\d{2}\)\s*\d{4}-\d{4}$/;
        return regex_tel.test(telefone);
    }
    alertaEmail(email) {
        const regex_email = /^[a-zA-Z0-9._-]+@(gmail\.com|hotmail\.com|outlook\.com)$/;
        return regex_email.test(email);
    }
    alertaEndereco(endereco) {
        const regex_endereco = /^(rua|avenida)\s.+/i;
        return regex_endereco.test(endereco);
    }

    
    //########## *** ##########//
    verificarCnpj(cnpj){
        const listaFornecedores = this.consultar(cnpj);    

        if (listaFornecedores.length != 0) {
            //Achei
            return true;
        } 
        else {
            //N achei
            return false;
        }
    }
}