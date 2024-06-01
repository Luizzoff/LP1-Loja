import conectar from "./Conexao.js"
import Cliente from "../modelo/Cliente.js"

export default class DAO_Cliente {
    constructor(){
        this.iniciaDataBase();
    }
    async iniciaDataBase(){
        try {
            const conexao = await conectar();
            const sql = `
                CREATE TABLE IF NOT EXISTS clientes (
                    nome VARCHAR(100) NOT NULL,
                    cpf VARCHAR(14) NOT NULL,
                    genero VARCHAR(16) NOT NULL,
                    dataNascimento DATE NOT NULL,
                    telefone VARCHAR(14) NOT NULL,
                    email VARCHAR(50) NOT NULL,
                    endereco VARCHAR(200) NOT NULL,
                    CONSTRAINT pk_clientes PRIMARY KEY(cpf)
                )
            `;
            await conexao.execute(sql);
        }
        catch(e) {
            console.log("Não foi possível iniciar o banco de dados: " + e.message);
        }
    }

    async gravar(cliente){
        if(cliente instanceof Cliente){
            const conexao = await conectar();
            const sql = `
                INSERT INTO clientes(nome, cpf, genero, dataNascimento, telefone, email, endereco)
                values(?,?,?,str_to_date(?,'%d/%m/%Y'),?,?,?)
            `;
            let parametros = [
                cliente.nome,
                cliente.cpf,
                cliente.genero,
                cliente.dataNascimento,
                cliente.telefone,
                cliente.email,
                cliente.endereco
            ];
            await conexao.execute(sql,parametros);
            await conexao.release();
        }
    }

    async excluir(cliente){
        if(cliente instanceof Cliente){
            const conexao = await conectar();
            const sql = `DELETE FROM clientes WHERE cpf = ?`;
            let parametros = [cliente.cpf];
            await conexao.execute(sql,parametros);
            await conexao.release();
        }
    }

    async atualizar(cliente){
        if(cliente instanceof Cliente){
            const conexao = await conectar();
            const sql = `
                UPDATE clientes SET nome=?, genero=?, dataNascimento=str_to_date(?,'%d/%m/%Y'), telefone=?, email=?, endereco=?
                WHERE cpf = ?
            `;
            let parametros = [
                cliente.nome,
                cliente.genero,
                cliente.dataNascimento,
                cliente.telefone,
                cliente.email,
                cliente.endereco,
                cliente.cpf
            ];
            await conexao.execute(sql,parametros);
            await conexao.release();
        }
    }

    async buscarAll(){
        const conexao = await conectar();
        const sql = `SELECT * FROM clientes`;
        const [dataBase, campos] = await conexao.execute(sql);
        await conexao.release();

        let listaClientes = [];
        for (const linha of dataBase){
            const cliente = new Cliente(
                linha.nome,
                linha.cpf,
                linha.genero,
                linha.dataNascimento,
                linha.telefone,
                linha.email,
                linha.endereco,
            );

            listaClientes.push(cliente);
        }
        return listaClientes;
    }

    async consultar(termo){
        const conexao = await conectar();
        const sql = `SELECT * FROM clientes WHERE cpf = ?`;
        const parametros = [termo];
        const [dataBase, campos] = await conexao.execute(sql,parametros);
        await conexao.release();

        let listaClientes = [];
        for (const linha of dataBase){
            const cliente = new Cliente(
                linha.nome,
                linha.cpf,
                linha.genero,
                linha.dataNascimento,
                linha.telefone,
                linha.email,
                linha.endereco,
            );

            listaClientes.push(cliente);
        }
        return listaClientes;
    }
}
