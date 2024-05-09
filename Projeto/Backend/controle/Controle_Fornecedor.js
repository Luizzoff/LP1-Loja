import Fornecedor from "../modelo/Fornecedor.js";

export default class Controle_Fornecedor {
    validar(nome, cnpj, telefone, email, endereco)
    {
        if (!this.verificarCnpj(cnpj) &&
            this.alertaNome(nome) &&
            this.alertaCnpj(cnpj) &&
            this.alertaTelefone(telefone) &&
            this.alertaEmail(email) &&
            this.alertaEndereco(endereco)) 
        {
            const fornecedor = new Fornecedor(nome, cnpj,
                                              telefone, email, endereco);
            fornecedor.adicionar();
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
    alertaCnpj(cnpj) {
        const regex_cnpj = /^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/;
        return regex_cnpj.test(cnpj);
    }
    alertaTelefone(telefone) {
        const regex_tel = /^\(\d{2}\)\s*\d{4}-\d{4}$/;
        return regex_tel.test(telefone);
    }
    alertaEmail(email) {
        const regex_email = /^[a-zA-Z0-9._-]+@(gmail\.com|hotmail\.com|outlook\.com)$/;
        return regex_email.test(email);
    }
    alertaEndereco(endereco) {
        const regex_endereco = /^(rua|avenida)\s.+/i;
        return regex_endereco.test(endereco);
    }

    
    //########## *** ##########//
    verificarCnpj(cnpj){
        const listaFornecedores = this.consultar(cnpj);    

        if (listaFornecedores.length != 0) {
            //Achei
            return true;
        } 
        else {
            //N achei
            return false;
        }
    }

    remover(cnpj) {
        const fornecedor = new Fornecedor();
        fornecedor.cnpj = cnpj;
        fornecedor.remover();
    }

    //alterar(){}

    buscarAll() {
        const fornecedor = new Fornecedor();
        return fornecedor.buscarAll();
    }

    consultar(termo) {
        const fornecedor = new Fornecedor();
        return fornecedor.consultar(termo);
    }
}