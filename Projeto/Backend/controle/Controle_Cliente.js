import Cliente from "../modelo/Cliente.js";

export default class Controle_Cliente {
    validar(nome, cpf, genero, dataNascimento, telefone, email, endereco)
    {        
        if (!this.verificarCpf(cpf) &&
            this.alertaNome(nome) &&
            this.alertaCpf(cpf) &&
            this.alertaGenero(genero) &&
            this.alertaDataNascimento(dataNascimento) &&
            this.alertaTelefone(telefone) &&
            this.alertaEmail(email) &&
            this.alertaEndereco(endereco)) 
        {
            const cliente = new Cliente(nome, cpf, 
                                        genero, dataNascimento,
                                        telefone, email, endereco);
            cliente.adicionar();
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
    
    
    //########## *** ##########//
    verificarCpf(cpf){
        const listaClientes = this.consultar(cpf);    

        if (listaClientes.length != 0) {
            //Achei
            return true;
        } 
        else {
            //N achei
            return false;
        }
    }

    remover(cpf) {
        const cliente = new Cliente();
        cliente.cpf = cpf;
        cliente.remover();
    }

    //alterar(){}

    buscarAll() {
        const cliente = new Cliente();
        return cliente.buscarAll();
    }

    consultar(termo) {
        const cliente = new Cliente();
        return cliente.consultar(termo)
    }
}