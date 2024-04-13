const formCadUsuario = document.getElementById('formCadUsuario');

window.onload = exibirTabelaUsuarios;

formCadUsuario.onsubmit = (evento) => {
    const usuario = document.getElementById('usuario').value;
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;
    const senha_confirmacao = document.getElementById('senha_confirmacao').value;
    const perfil = document.getElementById('perfil').value;

    const UsuaCtrl = new UsuarioCtrl();
    
    if(!UsuaCtrl.verificar(usuario)){
        if(senha == senha_confirmacao){
            if(UsuaCtrl.validar(usuario,email,senha,senha_confirmacao,perfil)){
                //é add o was-validated caso tenha algum erro no preenchimento dos dados para fornecer um feedback visual
                formCadUsuario.classList.remove('was-validated');
                //reseta a lista
                formCadUsuario.reset();
                exibirTabelaUsuarios();
            }
            else{
                //é add o was-validated caso tenha algum erro no preenchimento dos dados para fornecer um feedback visual
                formCadUsuario.classList.add('was-validated');
            }
        }
        else{
            alert("Senhas não coincidem");
        }
    }
    else{
        alert("Usuário já existente");
    }
    evento.stopPropagation();
    evento.preventDefault();
};

function exibirTabelaUsuarios(){
    const usuaCtrl = new UsuarioCtrl();
    const divTabela = document.getElementById('tabela');
    divTabela.innerHTML = '';
    const listaUsuarios = usuaCtrl.buscarUsuarios();
    if(listaUsuarios.length > 0){
        const tabela = document.createElement('table');
        tabela.className = 'table table-striped table-hover text-center';

        const cabecalho = document.createElement('thead');
        cabecalho.innerHTML=`
        <tr>
            <th>Usuário</th>
            <th>E-mail</th>
            <th>Senha</th>
            <th>Perfil</th>
            <th>####</th>
        </tr>`;

        const corpo = document.createElement('tbody');
        for (let i = 0; i < listaUsuarios.length; i++){
            const linha = document.createElement('tr');

            linha.innerHTML = `
                <td>${listaUsuarios[i].usuario}</td>
                <td>${listaUsuarios[i].email}</td>
                <td>${listaUsuarios[i].senha}</td>
                <td>${listaUsuarios[i].perfil}</td>
                <td>
                    <button type='button' class='btn btn-danger' onclick='excluirUsuario("${listaUsuarios[i].usuario}")'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
                            <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
                        </svg>
                    </button>
                </td>

            `;
            corpo.appendChild(linha);
        }
        tabela.appendChild(cabecalho);
        tabela.appendChild(corpo);
        divTabela.appendChild(tabela);
    }
    else{
        const paragrafo = document.createElement('p');
        paragrafo.innerText = "Não há produtos a serem exibidos!";
        divTabela.appendChild(paragrafo);
    }
}

function excluirUsuario(usuario){
    if(confirm("Deseja realmente excluir?")){
        const usuaCtrl = new UsuarioCtrl();
        usuaCtrl.removerUsuario(usuario);
        exibirTabelaUsuarios();
    }
}



