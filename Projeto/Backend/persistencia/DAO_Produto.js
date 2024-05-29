import conectar from "./Conexao.js"
import Produto from "../modelo/Produto.js"

export default class DAO_Produto{
    constructor(){
        this.iniciaDataBase();
    }
    async iniciaDataBase(){
        try {
            const conexao = await conectar();
            const sql = `
                CREATE TABLE IF NOT EXISTS produtos (
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
        catch(e) {
            console.log("Não foi possível iniciar o banco de dados: " + e.message);
        }
    }

    async gravar(produto){
        if(produto instanceof Produto){
            const conexao = await conectar();
            const sql = `INSERT INTO produtos(descricao,precoCusto,precoVenda,qtdEstoque,urlImagem,dataValidade)
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
            const resultado = await conexao.execute(sql,parametros);
            produto.codigo = resultado[0].insertId;
            await conexao.release();
        }
    }

    async excluir(produto){
        if(produto instanceof Produto){
            const conexao = await conectar();
            const sql = `DELETE FROM produtos WHERE codigo = ?`;
            let parametros = [produto.codigo];
            await conexao.execute(sql,parametros);
            await conexao.release();
        }
    }

    async atualizar(produto){
        if(produto instanceof Produto){
            const conexao = await conectar();
            const sql = `UPDATE produtos SET descricao=?,precoCusto=?,precoVenda=?,qtdEstoque=?,urlImagem=?,dataValidade=str_to_date(?,'%d/%m/%Y')
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
        const sql = `SELECT * FROM produtos`;
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
        let sql = "SELECT * FROM produtos WHERE codigo = ?";
        let parametros = [termo];
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