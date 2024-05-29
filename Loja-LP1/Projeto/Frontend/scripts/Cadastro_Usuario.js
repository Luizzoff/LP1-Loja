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


    if (!this.verificarEmail(email) &&
    !this.validarUsuario(usuario) &&
    this.validarEmail(email) &&
    !this.vazioSenha(senha) &&
    !this.vazioSenhaConfirmacao(senha_confirmacao) &&
    !this.validarSenha(senha,senha_confirmacao) &&
    !this.validarPerfil(perfil) )
    {
        fetch('http://localhost:3000/usuarios', {
            method: "POST",
            headers: {
                "Content-Type":"application/json"
            },
            body: JSON.stringify({
                "usuario":usuario,
                "email":email,
                "senha":senha,
                "senha_confirmacao":senha_confirmacao,
                "perfil": perfil
            })
        })
        .then((res) => { return res.json(); })
        .then((resJSON) => {
            if(resJSON.status){
                alert(resJSON.mensagem + '. email válido: ' + resJSON.email);
                formUsuario.reset();
                exibirUsuarios();
            }
            else {
                alert(resJSON.mensagem);
            }
        })
        .catch((erro) =>{
            alert('Erro ao incluir o produto: ' + erro.message);
        })
        limparClassesValidacao();
    }
    else{
        if (validarUsuario(usuario)) {
            usuarioInput.classList.remove('is-valid');
            usuarioInput.classList.add('is-invalid');
        }
        else{
            usuarioInput.classList.remove('is-invalid');
            usuarioInput.classList.add('is-valid');
        }
        
        //email
        if (!validarEmail(email)) {
            emailInput.classList.remove('is-valid');
            emailInput.classList.add('is-invalid');
        }
        else if(verificarEmail(email)){
            emailInput.classList.remove('is-valid');
            emailInput.classList.add('is-invalid');
            alert("Email já cadastrado")
        }
        else{
            emailInput.classList.remove('is-invalid');
            emailInput.classList.add('is-valid');
        }
        
        //senha
        if(!vazioSenha(senha) && !vazioSenhaConfirmacao(senha_confirmacao)){
            if (validarSenha(senha,senha_confirmacao)) {
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
            if(vazioSenha(senha)){
                senhaInput.classList.remove('is-valid');
                senhaInput.classList.add('is-invalid');
            }
            if(vazioSenhaConfirmacao(senha_confirmacao)){
                senhaConfirmacaoInput.classList.remove('is-valid');
                senhaConfirmacaoInput.classList.add('is-invalid');
            }
        }
        
        //perfil
        if (validarPerfil(perfil)) {
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



//===========================================================================//

function excluir(email) {
    if (confirm("Deseja realmente excluir?")){
        fetch('http://localhost:3000/usuarios/' + email, {
            method:"DELETE"
        })
        .then((res) => { return res.json(); })
        .then((resJSON) => {
            if(resJSON.status) {
                alert(resJSON.mensagem);// ta vindo do controle a resposta
                exibirUsuarios();
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
function exibirUsuarios(){
    const divTabela = document.getElementById('tabela');
    divTabela.innerHTML = "";
    fetch('http://localhost:3000/produtos', {
        method:"GET"
    })
    .then((res) => { return res.json(); })
    .then((listaUsuarios) => {

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
    })
}



//########### Validações ###########//
function validarUsuario(nome){
    if (nome === "") {
        return true;
    } else {
        return false;
    }
}
function validarEmail(email){
    const regex = /^[a-zA-Z0-9._-]+@(gmail\.com|hotmail\.com|outlook\.com)$/;
    return regex.test(email);
}
function validarSenha(senha,senha_confirmacao){
    if (senha !== senha_confirmacao) {
        return true;
    } else {
        return false;
    }
}
function vazioSenha(senha){
    if(senha === ""){
        return true;
    }
    else{
        return false;
    }
}
function vazioSenhaConfirmacao(senha_confirmacao){
    if(senha_confirmacao === ""){
        return true;
    }
    else{
        return false;
    }
}   
function validarPerfil(perfil){
    if (perfil === "") {
        return true;
    } else {
        return false;
    }
    
}