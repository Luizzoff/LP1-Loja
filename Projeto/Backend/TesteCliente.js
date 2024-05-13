import Cliente from "./modelo/Cliente.js";

const cliente = new Cliente( "luiz",
                             "123.456.789-10",
                             "masculino",
                             '12/05/2002',
                             "(69)99236-2505",
                             "luizgustavo.zrs@hotmail.com",
                             "Rua Deputado N784 Taciba SP");

const cliente02 = new Cliente( "ronivaldo",
                                    "789.456.123-00",
                                    "masculino",
                                    '01/11/1980',
                                    "(17)98118-4920",
                                    "dartin@gmail.com",
                                    "Avenida 03, N420");
//##### Adicionar #####
cliente.adicionar().then(()=>{
    console.log("Cliente 01 Adicionado");
}).catch(()=>{
    console.log("Cliente 01 Adicionado ERRO!");
});
cliente02.adicionar().then(()=>{
    console.log("Cliente 02 Adicionado");
}).catch(()=>{
    console.log("Cliente 02 Adicionado ERRO!");
});

//##### Alterar #####
cliente02.alterar().then(()=>{
    console.log("Cliente Alterado");
}).catch(()=>{
    console.log("Cliente 02 Alterado ERRO!");
});

//##### Remover #####
cliente02.remover().then(()=>{
    console.log("Cliente Removido");
}).catch(()=>{
    console.log("Cliente 02 Removido ERRO!");
})

//##### Buscar All #####
cliente.buscarAll().then((listaClientes)=>{
    console.log("All Clientes Buscados:");
    for(const linha of listaClientes){
        console.log(`
            ${linha.nome}
            ${linha.cpf}
            ${linha.genero}
            ${linha.dataNascimento}
            ${linha.telefone}
            ${linha.email}
            ${linha.endereco}
        `)
    }
}).catch(()=>{
    console.log("All Clientes Buscados ERRO!");
});

//##### Cosultar 1 Cliente Especifico #####
cliente02.consultar(cliente02.cpf).then((listaClientes)=>{
    console.log("Cliente Consultado:");
    for(const linha of listaClientes){
        console.log(`
            ${linha.nome}
            ${linha.cpf}
            ${linha.genero}
            ${linha.dataNascimento}
            ${linha.telefone}
            ${linha.email}
            ${linha.endereco}
        `)
    }
}).catch(()=>{
    console.log("Cliente Consultado ERRO!");
});