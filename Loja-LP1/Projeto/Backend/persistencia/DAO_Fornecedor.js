import conectar from "./Conexao.js"
import Fornecedor from "../modelo/Fornecedor.js"

export default class DAO_Fornecedor {
    constructor(){
        this.initDataBase();
    }

    async initDataBase(){
        const conexao = await conectar();
        const sql = `
            CREATE TABLE IF NOT EXISTS Fornecedores (
                nome VARCHAR(100) NOT NULL,
                cnpj VARCHAR(18) NOT NULL,
                telefone VARCHAR(13) NOT NULL,
                email VARCHAR(50) NOT NULL,
                endereco VARCHAR(200) NOT NULL
            )
        `;
        await conexao.execute(sql);
    }

    async adicionar(fornecedor){
        if(fornecedor instanceof Fornecedor){
            const conexao = await conectar();
            const sql = `INSERT INTO Fornecedores(nome, cnpj, telefone, email, endereco)
                values(?,?,?,?,?)
            `;
            let parametros = [
                fornecedor.nome,
                fornecedor.cnpj,
                fornecedor.telefone,
                fornecedor.email,
                fornecedor.endereco
            ];
            await conexao.execute(sql,parametros);
            await conexao.release();
        }
    }

    async remover(fornecedor){
        if(fornecedor instanceof Fornecedor){
            const conexao = await conectar();
            const sql = `DELETE FROM Fornecedores WHERE cnpj = ?`;
            let parametros = [
                fornecedor.cnpj
            ];
            await conexao.execute(sql,parametros);
            await conexao.release();
        }
    }

    async alterar(fornecedor){
        if(fornecedor instanceof Fornecedor){
            const conexao = await conectar();
            const sql = `UPDATE Fornecedores SET nome=?, telefone=?, email=?, endereco=?
                WHERE cnpj = ?
            `;
            let parametros = [
                fornecedor.nome,
                fornecedor.telefone,
                fornecedor.email,
                fornecedor.endereco,
                fornecedor.cnpj
            ];
            await conexao.execute(sql,parametros);
            await conexao.release();
        }
    }

    async buscarAll(){
        const conexao = await conectar();
        const sql = `SELECT * FROM Fornecedores`;
        const [dataBase, campos] = await conexao.execute(sql);

        let listaFornecedores = [];
        for (const linha of dataBase){
            const fornecedor = new Fornecedor(
                linha.nome,
                linha.cnpj,
                linha.telefone,
                linha.email,
                linha.endereco
            );

            listaFornecedores.push(fornecedor);
        }
        return listaFornecedores;
    }

    async consultar(termo){
        const conexao = await conectar();
        const sql = `SELECT * FROM Fornecedores WHERE cnpj LIKE ?`;
        const parametros = ['%' + termo + '%'];
        const [dataBase, campos] = await conexao.execute(sql, parametros);

        let listaFornecedores = [];
        for (const linha of dataBase){
            const fornecedor = new Fornecedor(
                linha.nome,
                linha.cnpj,
                linha.telefone,
                linha.email,
                linha.endereco
            );

            listaFornecedores.push(fornecedor);
        }
        return listaFornecedores;
    }
}
