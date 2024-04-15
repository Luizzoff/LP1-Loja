//Se conecta com HTML e pede a requisição ao CONTROLE
const formCliente = document.getElementById('formCliente');

window.onload = exibirClientes;

formCliente.onsubmit = (evento) => {
    const nomeInput = document.getElementById("nome");
    const cpfInput = document.getElementById("cpf");
    const generoInput = document.getElementById("genero");
    const dataNascimentoInput = document.getElementById("dataNascimento");
    const telefoneInput = document.getElementById("telefone");
    const emailInput = document.getElementById("email");
    const enderecoInput = document.getElementById("endereco");

    const nome = nomeInput.value;
    const cpf = cpfInput.value;
    const genero = generoInput.value;
    const dataNascimento = dataNascimentoInput.value;
    const telefone = telefoneInput.value;
    const email = emailInput.value;
    const endereco = enderecoInput.value;
    
    //Chama Controle
    const clienteCTRL = new Controle_Cliente();
    if(clienteCTRL.validar(nome, cpf, genero, dataNascimento, telefone, email, endereco))
    {
        limparClassesValidacao();
        formCliente.reset();
        exibirClientes();
    }
    else {
        //=======================================================
        //nome
        if (!clienteCTRL.alertaNome(nome)) 
        {
            nomeInput.classList.remove('is-valid');
            nomeInput.classList.add('is-invalid');
        } else {
            nomeInput.classList.remove('is-invalid');
            nomeInput.classList.add('is-valid');
        }

        //=======================================================
        //cpf
        if (!clienteCTRL.alertaCpf(cpf)) 
        {
            cpfInput.classList.remove('is-valid');
            cpfInput.classList.add('is-invalid');
        } else {
            if(clienteCTRL.buscarCPF(cpf)) {
                alert("CPF ja cadastrado!");
                cpfInput.classList.remove('is-valid');
                cpfInput.classList.add('is-invalid');
            } else {
                cpfInput.classList.remove('is-invalid');
                cpfInput.classList.add('is-valid');
            }
        }

        //=======================================================
        //genero
        if (!clienteCTRL.alertaGenero(genero)) 
        {
            generoInput.classList.remove('is-valid');
            generoInput.classList.add('is-invalid');
        } else {
            generoInput.classList.remove('is-invalid');
            generoInput.classList.add('is-valid');
        }

        //=======================================================
        // dataNascimento
        if (!clienteCTRL.alertaDataNascimento(dataNascimento)) 
        {
            dataNascimentoInput.classList.remove('is-valid');
            dataNascimentoInput.classList.add('is-invalid');
        } else {
            dataNascimentoInput.classList.remove('is-invalid');
            dataNascimentoInput.classList.add('is-valid');
        }

        //=======================================================
        // telefone
        if (!clienteCTRL.alertaTelefone(telefone)) 
        {
            telefoneInput.classList.remove('is-valid');
            telefoneInput.classList.add('is-invalid');
        } else {
            telefoneInput.classList.remove('is-invalid');
            telefoneInput.classList.add('is-valid');
        }
        
        //=======================================================
        // email
        if (!clienteCTRL.alertaEmail(email)) 
        {
            emailInput.classList.remove('is-valid');
            emailInput.classList.add('is-invalid');
        } else {
            emailInput.classList.remove('is-invalid');
            emailInput.classList.add('is-valid');
        }

        //=======================================================
        // endereco
        if (!clienteCTRL.alertaEndereco(endereco)) 
        {
            enderecoInput.classList.remove('is-valid');
            enderecoInput.classList.add('is-invalid');
        } else {
            enderecoInput.classList.remove('is-invalid');
            enderecoInput.classList.add('is-valid');
        }
    }

    evento.stopPropagation();
    evento.preventDefault();
}

function limparClassesValidacao() {
    const inputs = document.querySelectorAll('input');
    inputs.forEach(input => {
        input.classList.remove('is-invalid');
        input.classList.remove('is-valid');
    });

    const selects = document.querySelectorAll('select');
    selects.forEach(select => {
        select.classList.remove('is-invalid');
        select.classList.remove('is-valid');
    });
}

function remover(cpf) {
    if (confirm("Deseja realmente excluir?")) {
        const clienteCTRL = new Controle_Cliente();
        clienteCTRL.remover(cpf);
        exibirClientes();
    }
}

function exibirClientes() {
    const clienteCTRL = new Controle_Cliente();
    const listaClientes = clienteCTRL.buscarAll();

    const divTabela = document.getElementById('tabelaClientes');
    divTabela.innerHTML="";
    
    if (listaClientes.length > 0) {
        divTabela.classList.remove('w-50');
        divTabela.classList.remove('fw-bold');
        divTabela.classList.add('w-100');

        const tabela = document.createElement('table');
        tabela.className = 'table table-striped table-hover';

        const cabecalho = document.createElement('thead');
        cabecalho.innerHTML = `
            <tr>
                <th>Nome Completo</th>
                <th>CPF</th>
                <th>Genero</th>
                <th> Data de Nascimento</th>
                <th>Telefone</th>
                <th>E-mail</th>
                <th>Endereço</th>
                <th>####</th>
            </tr>
        `;

        const corpo = document.createElement('tbody');
        for (let i = 0; i < listaClientes.length; i++) {
            const tr1 = document.createElement('tr');
            tr1.innerHTML = `
                <td>${listaClientes[i].nome}</td>
                <td>${listaClientes[i].cpf}</td>
                <td>${listaClientes[i].genero}</td>
                <td>${listaClientes[i].dataNascimento}</td>
                <td>${listaClientes[i].telefone}</td>
                <td>${listaClientes[i].email}</td>
                <td rowspan="1">${listaClientes[i].endereco}</td>
                <td>
                    <button type='button' class='btn btn-danger' onclick='remover("${listaClientes[i].cpf}")'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
                            <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
                        </svg>
                    </button>
                </td>
            `;
            corpo.appendChild(tr1);
        }
        tabela.appendChild(cabecalho);
        tabela.appendChild(corpo);
        divTabela.appendChild(tabela);
    }
    else {
        divTabela.classList.remove('w-100');
        divTabela.classList.add('w-50');
        divTabela.classList.add('fw-bold');
        const alertaMensagem = document.createElement('p');
        alertaMensagem.innerText = "Não Há Clientes Cadastrados!";
        divTabela.appendChild(alertaMensagem);
    }
}