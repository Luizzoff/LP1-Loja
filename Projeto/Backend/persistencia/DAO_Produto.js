import conectar from "./Conexao.js"
import Produto from "../modelo/Produto.js"

export default class DAO_Produto{
    constructor(){
        this.initDataBase();
    }

    async initDataBase(){
        const conexao = await conectar();
        const sql = `
            CREATE TABLE IF NOT EXISTS Produtos (
                codigo INT NOT NULL AUTO_INCREMENT,
                descricao VARCHAR(200) NOT NULL,
                precoCusto DECIMAL(10,2) NOT NULL,
                precoVenda DECIMAL(10,2) NOT NULL,
                qtdEstoque INT NOT NULL DEFAULT 0,
                urlImagem VARCHAR(250) NOT NULL,
                dataValidade DATE NOT NULL,
                CONSTRAINT pk_produto PRIMARY KEY(codigo)
            )
        `;
        await conexao.execute(sql);
    }

    async adicionar(produto){
        if(produto instanceof Produto){
            const conexao = await conectar();
            const sql = `INSERT INTO Produtos(descricao,precoCusto,precoVenda,qtdEstoque,urlImagem,dataValidade)
                values(?,?,?,?,?,str_to_date(?,'%d/%m/%Y'))
            `;
            let parametros = [
                produto.descricao,
                produto.precoCusto,
                produto.precoVenda,
                produto.qtdEstoque,
                produto.urlImagem,
                produto.dataValidade
            ];
            //const resultado = await conexao.execute(sql,parametros);
            //produto.codigo = resultado[0].insertId;
            await conexao.execute(sql,parametros);
            await conexao.release();
        }
    }

    async remover(produto){
        if(produto instanceof Produto){
            const conexao = await conectar();
            const sql = `DELETE FROM Produtos WHERE codigo = ?`;
            let parametros = [
                produto.codigo
            ];
            await conexao.execute(sql,parametros);
            await conexao.release();
        }
    }

    async alterar(produto){
        if(produto instanceof Produto){
            const conexao = await conectar();
            const sql = `UPDATE Produtos SET descricao=?,precoCusto=?,precoVenda=?,qtdEstoque=?,urlImagem=?,dataValidade=str_to_date(?,'%d/%m/%Y')
                WHERE codigo = ?
            `;
            let parametros = [
                produto.descricao,
                produto.precoCusto,
                produto.precoVenda,
                produto.qtdEstoque,
                produto.urlImagem,
                produto.dataValidade,
                produto.codigo
            ];
            await conexao.execute(sql,parametros);
            await conexao.release();
        }
    }

    async buscarAll(){
        const conexao = await conectar();
        const sql = `SELECT * FROM Produtos`;
        const [dataBase, campos] = await conexao.execute(sql);

        let listaProdutos = [];
        for (const linha of dataBase){
            const produto = new Produto(
                linha.codigo,
                linha.descricao,
                linha.precoCusto,
                linha.precoVenda,
                linha.qtdEstoque,
                linha.urlImagem,
                linha.dataValidade
            );

            listaProdutos.push(produto);
        }
        return listaProdutos;
    }

    async consultar(termo){
        const conexao = await conectar();
        const sql = "SELECT * FROM Produtos WHERE descricao LIKE ?";
        const parametros = ['%' + termo + '%'];
        const [dataBase, campos] = await conexao.execute(sql,parametros);

        let listaProdutos = [];
        for(const linha of dataBase){
            const produto = new Produto(
                linha.codigo,
                linha.descricao,
                linha.precoCusto,
                linha.precoVenda,
                linha.qtdEstoque,
                linha.urlImagem,
                linha.dataValidade
            );
            listaProdutos.push(produto);
        }
        return listaProdutos;
    }
}
