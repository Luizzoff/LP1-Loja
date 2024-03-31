//Se conecta com HTML e pede a requisição ao CONTROLE
const formCliente = document.getElementById('formCliente');
const validaInput = document.querySelectorAll('input');
const validaSelect = document.getElementById('genero');
window.onload = exibirClientes;

formCliente.onsubmit = (evento) => {
    nome = document.getElementById("nome").value;
    cpf = document.getElementById("cpf").value;
    genero = document.getElementById("genero").value;
    dataNascimento = document.getElementById("dataNascimento").value;
    telefone = document.getElementById("telefone").value;
    email = document.getElementById("email").value;
    //Chama Contorle
    const clienteCTRL = new Controle_Cliente();
    if(clienteCTRL.validar(nome, cpf, genero, dataNascimento, telefone, email))
    {
        validaSelect.classList.remove('is-invalid');
        validaInput.forEach(input => {
            input.classList.remove('is-invalid');
        });
        formCliente.reset();
        exibirClientes();
    }
    else {
        // formCliente.classList.add('was-validated');
        validaSelect.classList.add('is-invalid');
        validaInput.forEach(input => {
            input.classList.add('is-invalid');
        });
    }
    evento.stopPropagation();
    evento.preventDefault();
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
    const listaClientes = clienteCTRL.buscar();

    const divTabela = document.getElementById('tabelaClientes');
    divTabela.innerHTML="";
    
    if (listaClientes.length > 0) {
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
                <th>####</th>
            </tr>
        `;

        const corpo = document.createElement('tbody');
        for (let i = 0; i < listaClientes.length; i++) {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${listaClientes[i].nome}</td>
                <td>${listaClientes[i].cpf}</td>
                <td>${listaClientes[i].genero}</td>
                <td>${listaClientes[i].dataNascimento}</td>
                <td>${listaClientes[i].telefone}</td>
                <td>${listaClientes[i].email}</td>
                <td>
                    <button type='button' class='btn btn-danger' onclick='remover("${listaClientes[i].cpf}")'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
                            <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
                        </svg>
                    </button>
                </td>
            `;
            corpo.appendChild(tr);
        }
        tabela.appendChild(cabecalho);
        tabela.appendChild(corpo);
        divTabela.appendChild(tabela);
    }
    else {
        const alertaMensagem = document.createElement('p');
        alertaMensagem.innerText = "Não Há Clientes Cadastrados!";
        divTabela.appendChild(alertaMensagem);
    }
}