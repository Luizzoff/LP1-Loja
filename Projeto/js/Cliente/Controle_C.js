class Controle_Cliente {
    validar(nome, cpf, genero, dataNascimento, telefone, email) {
        if (nome !== "") 
        {
            const clientMDL = new Modelo_Cliente(nome, cpf, genero, dataNascimento, telefone, email);
            clientMDL.adicionar();
            return true;
        }
        else {
            return false;
        }
    }

    remover(cpf) {
        const clienteMDL = new Modelo_Cliente();
        clienteMDL.cpf = cpf;
        clienteMDL.remover();
    }

    buscar() {
        const clienteMDL = new Modelo_Cliente();
        return clienteMDL.buscar();
    }
}