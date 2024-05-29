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

            if (nome && cnpj && telefone && email && endereco) 
        {
                const fornecedor = new Fornecedor(nome, cnpj, telefone, email, endereco);                                   
                
                fornecedor.gravar()
                .then(()=>{
                    res.status(200).json({
                        "status":true,
                        "mensagem":"Fornecedor adicionado com sucesso!",
                        "cnpj": fornecedor.cnpj
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
            const cnpj = req.params.cnpj;
            if (cnpj)
            {
                const fornecedor = new Fornecedor();
                fornecedor.cnpj = cnpj;
                fornecedor.excluir()
                .then(()=>{
                    res.status(200).json({
                        "status":true,
                        "mensagem":"fornecedor excluído com sucesso!",
                    });
                })
                .catch((erro)=>{
                    res.status(500).json({
                        "status":false,
                        "mensagem":"Erro ao excluir fornecedor: " + erro.message
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

            if (nome && cnpj && telefone && email && endereco) 
            {
                const fornecedor = new Fornecedor(nome, cnpj, telefone, email, endereco);
                fornecedor.atualizar()
                .then(()=>{
                    res.status(200).json({
                        "status":true,
                        "mensagem":"Fornecedor alterado com sucesso!",
                    });
                })
                .catch((erro)=>{
                    res.status(500).json({
                        "status":false,
                        "mensagem":"Erro ao atualizar o fornecedor: " + erro.message
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
            const fornecedores = new Fornecedor();
            fornecedores.buscarAll()
            .then((listaFornecedores) =>{
                res.status(200).json(listaFornecedores);
            })
            .catch((erro) => {
                res.status(500).json({
                    "status":false,
                    "mensagem":"Erro ao buscarAll fornecedores: " + erro.message    
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
            const cnpj = req.params.cnpj;
            if (cnpj)
            {
                const fornecedores = new Fornecedor();
                fornecedores.consultar(cnpj)
                .then((listaFornecedor) =>{
                    res.status(200).json(listaFornecedor);
                })
                .catch((erro) => {
                    res.status(500).json({
                        "status":false,
                        "mensagem":"Erro ao consultar fornecedores: " + erro.message    
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