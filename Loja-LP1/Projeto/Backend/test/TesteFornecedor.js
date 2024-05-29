import Fornecedor from "../modelo/Fornecedor.js";

const fornecedor = new Fornecedor ("Renato Linhas", "12.123.12/0001-11", "(11)22345-6679", "renatoQuerOtrabalho@gmail.com", "Avenida Desespero Eminente N4" );



fornecedor.buscarAll().then((listaFornecedores)=>{
    console.log("All Fornecedores Buscados:");
    for(const linha of listaFornecedores){
        console.log(`
            ${linha.nome}
            ${linha.cnpj}
            ${linha.telefone}
            ${linha.email}
            ${linha.endereco}
        `)
    }
}).catch(()=>{
    console.log("All Fornecedores Buscados ERRO!");
});

fornecedor.adicionar().then(()=>{
    console.log("fornecedor  Adicionado");
}).catch(()=>{
    console.log("fornecedor  Adicionado ERRO!");
});



