const formUsuario = document.getElementById('formUsuario');
window.onload = exibirUsuarios;

formUsuario.onsubmit = (evento) => {
    const usuarioInput = document.getElementById('usuario');
    const emailInput = document.getElementById('email');
    const senhaInput = document.getElementById('senha');
    const senhaConfirmacaoInput = document.getElementById('senha_confirmacao');
    const perfilInput = document.getElementById('perfil');

    const usuario = usuarioInput.value;
    const email = emailInput.value;
    const senha = senhaInput.value;
    const senha_confirmacao = senhaConfirmacaoInput.value;
    const perfil = perfilInput.value;

    const usuarioCtrl = new Controle_Usuario();

    if(usuarioCtrl.validar(usuario,email,senha,senha_confirmacao,perfil)){
        limparClassesValidacao();
        formUsuario.reset();
        exibirUsuarios();
    }
    else{
        if (usuarioCtrl.validarUsuario(usuario)) {
            usuarioInput.classList.remove('is-valid');
            usuarioInput.classList.add('is-invalid');
        }
        else{
            usuarioInput.classList.remove('is-invalid');
            usuarioInput.classList.add('is-valid');
        }
        
        //email
        if (!usuarioCtrl.validarEmail(email)) {
            emailInput.classList.remove('is-valid');
            emailInput.classList.add('is-invalid');
        }
        else if(usuarioCtrl.verificarEmail(email)){
            emailInput.classList.remove('is-valid');
            emailInput.classList.add('is-invalid');
            alert("Email já cadastrado")
        }
        else{
            emailInput.classList.remove('is-invalid');
            emailInput.classList.add('is-valid');
        }
        
        //senha
        if(!usuarioCtrl.vazioSenha(senha) && !usuarioCtrl.vazioSenhaConfirmacao(senha_confirmacao)){
            if (usuarioCtrl.validarSenha(senha,senha_confirmacao)) {
                senhaInput.classList.remove('is-valid');
                senhaInput.classList.add('is-invalid');
                senhaConfirmacaoInput.classList.remove('is-valid');
                senhaConfirmacaoInput.classList.add('is-invalid');
                alert("Senhas não coincidem")
            }
            else{
                senhaInput.classList.remove('is-invalid');
                senhaInput.classList.add('is-valid');
                senhaConfirmacaoInput.classList.remove('is-invalid');
                senhaConfirmacaoInput.classList.add('is-valid');
            }
        }
        else{
            if(usuarioCtrl.vazioSenha(senha)){
                senhaInput.classList.remove('is-valid');
                senhaInput.classList.add('is-invalid');
            }
            if(usuarioCtrl.vazioSenhaConfirmacao(senha_confirmacao)){
                senhaConfirmacaoInput.classList.remove('is-valid');
                senhaConfirmacaoInput.classList.add('is-invalid');
            }
        }
        
        //perfil
        if (usuarioCtrl.validarPerfil(perfil)) {
            perfilInput.classList.remove('is-valid');
            perfilInput.classList.add('is-invalid');
        }
        else{
            perfilInput.classList.remove('is-invalid');
            perfilInput.classList.add('is-valid');
        }
        
       
    }

    evento.stopPropagation();
    evento.preventDefault();
};
email.addEventListener('input', function() {
    const email = this.value;
    const usuarioCtrl = new Controle_Usuario();
    if (!usuarioCtrl.validarEmail(email)) {
        this.classList.remove('is-valid');
        this.classList.add('is-invalid');
    } else {
        this.classList.remove('is-invalid');
        this.classList.add('is-valid');
    }
});
function limparClassesValidacao() {
    const inputs = document.querySelectorAll('.form-control');
    inputs.classList.remove('is-invalid is-valid');        

    const selects = document.querySelectorAll('.form-select');
    selects.classList.remove('is-invalid is-valid');        
}



function remover(email){
    if(confirm("Deseja realmente excluir?")){
        const usuarioCtrl = new Controle_Usuario();
        usuarioCtrl.remover(email);
        exibirUsuarios();
    }
}
function exibirUsuarios(){
    const usuarioCtrl = new Controle_Usuario();
    const divTabela = document.getElementById('tabela');
    
    divTabela.innerHTML = '';
    const listaUsuarios = usuarioCtrl.buscarAll();

    if(listaUsuarios.length > 0){
        divTabela.classList.remove('w-25');
        divTabela.classList.remove('fw-bold');
        divTabela.classList.add('w-75');
        
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
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${listaUsuarios[i].usuario}</td>
                <td>${listaUsuarios[i].email}</td>
                <td>${listaUsuarios[i].senha}</td>
                <td>${listaUsuarios[i].perfil}</td>
                <td>
                    <button type='button' class='btn btn-danger' onclick='remover("${listaUsuarios[i].email}")'>
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
    else{
        divTabela.classList.remove('w-75');
        divTabela.classList.add('w-25');
        divTabela.classList.add('fw-bold');
        const paragrafo = document.createElement('p');
        paragrafo.innerText = "Não Há Usuários Cadastrados!";
        divTabela.appendChild(paragrafo);
    }
}