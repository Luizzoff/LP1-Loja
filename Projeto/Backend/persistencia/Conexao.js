import mysql from 'mysql2/promise'

export default async function conectar() {
    if (global.poolConexoes) {
        return await poolConexoes.getConnection();
    } 
    else {
        global.poolConexoes = await mysql.createPool({
            host: "localhost",
            port: 3306,
            database: "BitStich",
            user: "root",
            password: "",
            connectTimeout: 60000,
            waitForConnections: true,
            queueLimit: 20
        });
        return await global.poolConexoes.getConnection();
    }
}