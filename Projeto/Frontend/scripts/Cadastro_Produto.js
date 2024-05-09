const formProduto = document.getElementById('formProduto');
window.onload = exibirProdutos;

formProduto.onsubmit = (evento) => {
    const codigoInput = document.getElementById('codigo');
    const descricaoInput = document.getElementById('descricao');
    const precoCustoInput = document.getElementById('precoCusto');
    const precoVendaInput = document.getElementById('precoVenda');
    const qtdEstoqueInput = document.getElementById('qtdEstoque');
    const urlImagemInput = document.getElementById('urlImagem');
    const dataValidadeInput = document.getElementById('dataValidade');

    const codigo = codigoInput.value;
    const descricao = descricaoInput.value;
    const precoCusto = precoCustoInput.value;
    const precoVenda = precoVendaInput.value;
    const qtdEstoque = qtdEstoqueInput.value;
    const urlImagem = urlImagemInput.value;
    const dataValidade = dataValidadeInput.value;

    const produtoCtrl = new Controle_Produto();
    if(produtoCtrl.validar(codigo, descricao, precoCusto, precoVenda, qtdEstoque, urlImagem, dataValidade)) {
        limparClassesValidacao();
        formProduto.reset();
        exibirProdutos();
    }
    else {
        //=======================================================
        //codigo
        if (!produtoCtrl.alertaCodigo(codigo)) 
        {
            codigoInput.classList.remove('is-valid');
            codigoInput.classList.add('is-invalid');
        } 
        else if(produtoCtrl.verificarCodigo(codigo))
        {
            alert("Codigo de produto ja cadastrado!");
            codigoInput.classList.remove('is-valid');
            codigoInput.classList.add('is-invalid');
        }
        else {
            codigoInput.classList.remove('is-invalid');
            codigoInput.classList.add('is-valid');
        }

        //=======================================================
        //dataValidade
        if (!produtoCtrl.alertaDataValidade(dataValidade)) 
        {
            dataValidadeInput.classList.remove('is-valid');
            dataValidadeInput.classList.add('is-invalid');
        } else {
            dataValidadeInput.classList.remove('is-invalid');
            dataValidadeInput.classList.add('is-valid');
        }

        //=======================================================
        //descricao
        if (!produtoCtrl.alertaDescricao(descricao))
        {
            descricaoInput.classList.remove('is-valid');
            descricaoInput.classList.add('is-invalid');
        } else {
            descricaoInput.classList.remove('is-invalid');
            descricaoInput.classList.add('is-valid');
        }

        //=======================================================
        //precoCusto
        if (!produtoCtrl.alertaPrecoCusto(precoCusto))
        {
            precoCustoInput.classList.remove('is-valid');
            precoCustoInput.classList.add('is-invalid');
        } else {
            precoCustoInput.classList.remove('is-invalid');
            precoCustoInput.classList.add('is-valid');
        }

        //=======================================================
        //precoVenda
        if (!produtoCtrl.alertaPrecoVenda(precoVenda))
        {
            precoVendaInput.classList.remove('is-valid');
            precoVendaInput.classList.add('is-invalid');
        } else {
            precoVendaInput.classList.remove('is-invalid');
            precoVendaInput.classList.add('is-valid');
        }

        //=======================================================
        //qtdEstoque
        if (!produtoCtrl.alertaQtdEstoque(qtdEstoque))
        {
            qtdEstoqueInput.classList.remove('is-valid');
            qtdEstoqueInput.classList.add('is-invalid');
        } else {
            qtdEstoqueInput.classList.remove('is-invalid');
            qtdEstoqueInput.classList.add('is-valid');
        }

        //=======================================================
        //urlImagem
        if (!produtoCtrl.alertaUrlImagem(urlImagem)) 
        {
            urlImagemInput.classList.remove('is-valid');
            urlImagemInput.classList.add('is-invalid');
        } else {
            urlImagemInput.classList.remove('is-invalid');
            urlImagemInput.classList.add('is-valid');
        }
    }            

    evento.stopPropagation();
    evento.preventDefault();
};
function limparClassesValidacao() {
    const inputs = document.querySelectorAll('input');
    inputs.classList.remove('is-invalid is-valid');

    const selects = document.querySelectorAll('select');
    selects.classList.remove('is-invalid is-valid');
}



function remover(codigo) {
    if (confirm("Deseja realmente excluir?")){
        const produtoCtrl = new Controle_Produto();
        produtoCtrl.remover(codigo);
        exibirProdutos();
    }
}
function exibirProdutos() {
    const produtoCtrl = new Controle_Produto();
    const listaProdutos = produtoCtrl.buscarAll();
    
    const divTabela = document.getElementById('tabelaProdutos');
    divTabela.innerHTML = "";

    if (listaProdutos.length > 0) {
        divTabela.classList.remove('fw-bold');
        const tabela = document.createElement('table');
        tabela.className = 'table table-striped table-hover';

        const cabecalho = document.createElement('thead');
        cabecalho.innerHTML = `
        <tr>
            <th>Código</th>
            <th>Descrição</th>
            <th>Preço de Custo</th>
            <th>Preço de Venda</th>
            <th>Estoque</th>
            <th>Validade</th>
            <th>Imagem</th>
            <th>####</th>
        </tr>`;

        const corpo = document.createElement('tbody');
        // corpo.className = 'table-group-divider'
        for (let i = 0; i < listaProdutos.length; i++) {
            const tr = document.createElement('tr');
            //string literals
            tr.innerHTML = `
                <td>${listaProdutos[i].codigo}</td>
                <td>${listaProdutos[i].descricao}</td>
                <td>${listaProdutos[i].precoCusto}</td>
                <td>${listaProdutos[i].precoVenda}</td>
                <td>${listaProdutos[i].qtdEstoque}</td>
                <td style>${listaProdutos[i].dataValidade}</td>
                <td>
                    <img width='32px' heigth='32px' src='${listaProdutos[i].urlImagem}'>
                </td>
                <td>
                    <button type='button' class='btn btn-danger' onclick='remover("${listaProdutos[i].codigo}")'>
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
        divTabela.classList.add('fw-bold');
        const alertaMensagem = document.createElement('p');
        alertaMensagem.innerText = "Não Há Produtos Cadastrados!";
        divTabela.appendChild(alertaMensagem);
    }
}