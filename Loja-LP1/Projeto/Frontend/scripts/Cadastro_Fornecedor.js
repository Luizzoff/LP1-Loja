const formFornecedor = document.getElementById('formFornecedor');
window.onload = exibirFornecedores;

formFornecedor.onsubmit = (evento) => {
    const nomeInput = document.getElementById("nome");
    const cnpjInput = document.getElementById("cnpj");
    const telefoneInput = document.getElementById("telefone");
    const emailInput = document.getElementById("email");
    const enderecoInput = document.getElementById("endereco");

    const nome = nomeInput.value;
    const cnpj = cnpjInput.value;
    const telefone = telefoneInput.value;
    const email = emailInput.value;
    const endereco = enderecoInput.value;

    
    if (alertaNome(nome) &&
            alertaCnpj(cnpj) &&
            alertaTelefone(telefone) &&
            alertaEmail(email) &&
            alertaEndereco(endereco)) 
    {
        fetch('http://localhost:3000/fornecedores', {
            method: "POST",
            headers: {
                "Content-Type":"application/json"
            },
            body: JSON.stringify({
                "nome":nome,
                "cnpj":cnpj,
                "telefone":telefone,
                "email": email,
                "endereco":endereco
            })
        })
        .then((res) => { return res.json(); })
        .then((resJSON) => {
            if(resJSON.status){
                alert(resJSON.mensagem + '. CNPJ válido: ' + resJSON.cnpj);
                formFornecedor.reset();
                exibirProdutos();
            }
            else {
                alert(resJSON.mensagem);
            }
        })
        .catch((erro) =>{
            alert('Erro ao incluir o fornecedor: ' + erro.message);
        })
        limparClassesValidacao();
    }
    else {
        //=======================================================
        if(!alertaNome(nome)) 
        {
            nomeInput.classList.remove('is-valid');
            nomeInput.classList.add('is-invalid');
        } else {
            nomeInput.classList.remove('is-invalid');
            nomeInput.classList.add('is-valid');
        }

        //=======================================================
        //cnpj
        if (!alertaCnpj(cnpj)) 
        {
            cnpjInput.classList.remove('is-valid');
            cnpjInput.classList.add('is-invalid');
        } else {
            if(verificarCnpj(cnpj)) {
                alert("cnpj ja cadastrado!");
                cnpjInput.classList.remove('is-valid');
                cnpjInput.classList.add('is-invalid');
            } else {
                cnpjInput.classList.remove('is-invalid');
                cnpjInput.classList.add('is-valid');
            }
        }

        //=======================================================
        // telefone
        if (!alertaTelefone(telefone)) 
        {
            telefoneInput.classList.remove('is-valid');
            telefoneInput.classList.add('is-invalid');
        } else {
            telefoneInput.classList.remove('is-invalid');
            telefoneInput.classList.add('is-valid');
        }
        
        //=======================================================
        // email
        if (!alertaEmail(email)) 
        {
            emailInput.classList.remove('is-valid');
            emailInput.classList.add('is-invalid');
        } else {
            emailInput.classList.remove('is-invalid');
            emailInput.classList.add('is-valid');
        }

        //=======================================================
        // endereco
        if (!alertaEndereco(endereco)) 
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
    inputs.classList.remove('is-invalid is-valid');
}



function excluir(cnpj) {
    if (confirm("Deseja realmente excluir?")){
        fetch('http://localhost:3000/fornecedores/' + cnpj, {
            method:"DELETE"
        })
        .then((res) => { return res.json(); })
        .then((resJSON) => {
            if(resJSON.status) {
                alert(resJSON.mensagem);// ta vindo do controle a resposta
                exibirFornecedores();
            }
            else {
                alert("Erro ao excluir: " + resJSON.mensagem);
            }
        })
        .catch((erro) => {
            alert("Erro no banco de dados: " + erro.message);
        })
    }
}
function exibirFornecedores() {
    const divTabela = document.getElementById('tabelaFornecedores');
    divTabela.innerHTML="";

    fetch('htttp://localhost:3000/fornecedores', {
        method:"GET"
    })
    .then((res) => {return res.json();})
    .then((listaFornecedores) => {
        if (listaFornecedores.length > 0) {
            divTabela.classList.remove('w-50');
            divTabela.classList.remove('fw-bold');
            divTabela.classList.add('w-100');
    
            const tabela = document.createElement('table');
            tabela.className = 'table table-striped table-hover';
    
            const cabecalho = document.createElement('thead');
            cabecalho.innerHTML = `
                <tr>
                    <th>Nome Empresa</th>
                    <th>CNPJ</th>
                    <th>Telefone</th>
                    <th>E-mail</th>
                    <th>Endereço</th>
                    <th>####</th>
                </tr>
            `;
    
            const corpo = document.createElement('tbody');
            for (let i = 0; i < listaFornecedores.length; i++) {
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td>${listaFornecedores[i].nome}</td>
                    <td>${listaFornecedores[i].cnpj}</td>
                    <td>${listaFornecedores[i].telefone}</td>
                    <td>${listaFornecedores[i].email}</td>
                    <td rowspan="1">${listaFornecedores[i].endereco}</td>
                    <td>
                        <button type='button' class='btn btn-danger' onclick='remover("${listaFornecedores[i].cnpj}")'>
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
            divTabela.classList.remove('w-100');
            divTabela.classList.add('w-50');
            divTabela.classList.add('fw-bold');
            const alertaMensagem = document.createElement('p');
            alertaMensagem.innerText = "Não Há Fornecedores Cadastrados!";
            divTabela.appendChild(alertaMensagem);
        }
    })
    
}


//########### Alertas ###########//
function alertaNome(nome) {
    if (nome === "" || !isNaN(nome)) {
        return false;
    } else {
        return true;
    }
}
function alertaCnpj(cnpj) {
    const regex_cnpj = /^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/;
    return regex_cnpj.test(cnpj);
}
function alertaTelefone(telefone) {
    const regex_tel = /^\(\d{2}\)\s*\d{4}-\d{4}$/;
    return regex_tel.test(telefone);
}
function alertaEmail(email) {
    const regex_email = /^[a-zA-Z0-9._-]+@(gmail\.com|hotmail\.com|outlook\.com)$/;
    return regex_email.test(email);
}
function alertaEndereco(endereco) {
    const regex_endereco = /^(rua|avenida)\s.+/i;
    return regex_endereco.test(endereco);
}