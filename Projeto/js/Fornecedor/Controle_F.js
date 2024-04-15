class Controle_Fornecedores {
    validar(nome, cnpj, telefone, email, endereco) {
        if (this.alertaNome(nome) && this.alertaCnpj(cnpj) && !this.buscarcnpj(cnpj) &&
            this.alertaTelefone(telefone) && this.alertaEmail(email) && this.alertaEndereco(endereco)) 
        {
            const fornMDL = new Modelo_Fornecedores(nome, cnpj, telefone, email, endereco);
            fornMDL.adicionar();
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


    remover(cnpj) {
        const fornecedoresMDL = new Modelo_Fornecedores();
        fornecedoresMDL.cnpj = cnpj;
        fornecedoresMDL.remover();
    }

    buscarAll() {
        const fornMDL = new Modelo_Fornecedores();
        return fornMDL.buscarAll();
    }

    buscarcnpj(cnpj) {
        const listaFornecedores = this.buscarAll();

        const listaAtualizada = listaFornecedores.filter( (itemLista) =>
                                { return itemLista.cnpj == cnpj; });
            
        if (listaAtualizada.length != 0) {
            return true;
        }
        else {
            return false;
        }
    }
}