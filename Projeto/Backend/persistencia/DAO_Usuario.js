import conectar from "./Conexao.js"
import Usuario from "../modelo/Usuario.js"

export default class DAO_Usuario{
    constructor(){
        this.initDataBase();
    }

    async initDataBase(){
        const conexao = await conectar();
        const sql = `
            CREATE TABLE IF NOT EXISTS Usuarios (
                usuario VARCHAR(100) NOT NULL,
                email VARCHAR(50) NOT NULL,
                senha VARCHAR(50) NOT NULL,
                senha_confirmacao VARCHAR(50) NOT NULL,
                perfil VARCHAR(9) NOT NULL
            )
        `;
        await conexao.execute(sql);
    }

    async adicionar(usuario){
        if(usuario instanceof Usuario){
            const conexao = await conectar();
            const sql = `INSERT INTO Usuarios(nome, email, senha, senha_confirmacao, perfil)
                values(?,?,?,?,?)
            `;
            let parametros = [
                usuario.nome,
                usuario.email,
                usuario.senha,
                usuario.senha_confirmacao,
                usuario.perfil
            ];
            await conexao.execute(sql,parametros);
            await conexao.release();
        }
    }

    async remover(usuario){
        if(usuario instanceof Usuario){
            const conexao = await conectar();
            const sql = `DELETE FROM Usuarios WHERE email = ?`;
            let parametros = [
                usuario.email
            ];
            await conexao.execute(sql,parametros);
            await conexao.release();
        }
    }

    async alterar(usuario){
        if(usuario instanceof Usuario){
            const conexao = await conectar();
            const sql = `UPDATE Usuarios SET nome=?, email=?, senha=?, senha_confirmacao=?, perfil=?
                WHERE email = ?
            `;
            let parametros = [
                usuario.nome,
                usuario.email,
                usuario.senha,
                usuario.senha_confirmacao,
                usuario.perfil,
                usuario.email
            ];
            await conexao.execute(sql,parametros);
            await conexao.release();
        }
    }

    async buscarAll(){
        const conexao = await conectar();
        const sql = `SELECT * FROM Usuarios`;
        const dataBase = await conexao.execute(sql);

        let listaUsuarios = [];
        for (const linha of dataBase){
            const usuario = new Usuario(
                linha['nome'],
                linha['email'],
                linha['senha'],
                linha['senha_confirmacao'],
                linha['perfil']
            );

            listaUsuarios.push(usuario);
        }
        return listaUsuarios;
    }

    async consultar(termo){
        const conexao = await conectar();
        const sql = `SELECT * FROM Usuarios WHERE email LIKE ?`;
        const parametros = ['%' + termo + '%'];
        const [dataBase, campos] = await conexao.execute(sql,parametros);

        let listaUsuarios = [];
        for (const linha of dataBase){
            const usuario = new Usuario(
                linha['nome'],
                linha['email'],
                linha['senha'],
                linha['senha_confirmacao'],
                linha['perfil']
            );

            listaUsuarios.push(usuario);
        }
        return listaUsuarios;
    }
}