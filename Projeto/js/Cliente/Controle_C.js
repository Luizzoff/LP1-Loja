class Controle_Cliente {
    validar(nome, cpf, genero, dataNascimento, telefone, email, endereco) {        
        if (this.alertaNome(nome) && this.alertaCpf(cpf) && this.alertaGenero(genero) &&
            this.alertaDataNascimento(dataNascimento) && this.alertaTelefone(telefone) &&
            this.alertaEmail(email) && this.alertaEndereco(endereco)) 
        {
            const clientMDL = new Modelo_Cliente(nome, cpf, genero, dataNascimento, telefone, email, endereco);
            clientMDL.adicionar();
            return true;
        }
        else {
            return false;
        }
    }

    alertaNome(nome) {
        if (nome === "" || !isNaN(nome)) {
            return false;
        } else {
            return true;
        }
    }
    alertaGenero(genero) {
        if (genero === "") {
            return false;            
        } else {
            return true;
        }
    }
    alertaDataNascimento(dataNascimento) {
        if (dataNascimento === "") {
            return false;            
        } else {
            return true;
        }
    }
    alertaCpf(cpf) {
        const regex_cpf = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
        return regex_cpf.test(cpf);
    }
    alertaTelefone(telefone) {
        const regex_tel = /^\(\d{2}\)\s*\d{4,5}-\d{4}$/;
        return regex_tel.test(telefone);
    }
    alertaEmail(email) {
        const regex_email = /^[a-zA-Z0-9._-]+@(gmail\.com|hotmail\.com|outlook\.com)$/;
        return regex_email.test(email);
    }
    alertaEndereco(endereco) {
        const regex_endereco = /^(Avenida|Rua|avenida|rua)\s(?:.*\s)?/;
        return regex_endereco.test(endereco);
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
        const listaClientes = this.buscarAll();

        const listaAtualizada = listaClientes.filter( (itemLista) =>
                                { return itemLista.cpf == cpf; });
            
        if (listaAtualizada.length != 0) {
            return true;
        }
        else {
            return false;
        }
    }
}