class Controle_Cliente {
    validar(nome, cpf, genero, dataNascimento, telefone, email, endereco) {
        const regex_endereco = /^(Avenida|Rua|avenida|rua)\s(?:.*\s)?Nº\d+\s\w+\s\d{5}-\d{3}\s([A-Za-z]{2})$/;
        const regex_email = /^[a-zA-Z0-9._-]+@(gmail\.com|hotmail\.com|outlook\.com)$/;
        const regex_cpf = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
        const regex_tel = /^\(\d{2}\)\s*\d{4,5}-\d{4}$/;

        if (nome !== "" && isNaN(nome) && genero !== "" && dataNascimento !== "" &&
            regex_cpf.test(cpf) && regex_tel.test(telefone) && regex_email.test(email) &&
            regex_endereco.test(endereco)) 
        {
            const clientMDL = new Modelo_Cliente(nome, cpf, genero, dataNascimento, telefone, email, endereco);
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

    buscarAll() {
        const clienteMDL = new Modelo_Cliente();
        return clienteMDL.buscarAll();
    }

    buscarCPF(cpf) {
        const clienteMDL = new Modelo_Cliente();
        clienteMDL.cpf = cpf;
        return clienteMDL.buscarCPF();
    }
}