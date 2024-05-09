import DAO_Produto from "../persistencia/DAO_Produto.js";

export default class Produto {
    #codigo; #descricao; #precoCusto; #precoVenda; #qtdEstoque; #urlImagem; #dataValidade;
    constructor(codigo=0, descricao="", precoCusto=0, precoVenda=0,
                qtdEstoque=0, urlImagem="", dataValidade="")
    {
        this.#codigo=codigo;
        this.#descricao=descricao;
        this.#precoCusto=precoCusto;
        this.#precoVenda=precoVenda;
        this.#qtdEstoque=qtdEstoque;
        this.#urlImagem=urlImagem;
        this.#dataValidade=dataValidade;            
    }
    
    get codigo() {return this.#codigo;}
    get descricao() {return this.#descricao;}
    get precoCusto() {return this.#precoCusto;}
    get precoVenda() {return this.#precoVenda;}
    get qtdEstoque() {return this.#qtdEstoque;}
    get urlImagem() {return this.#urlImagem;}
    get dataValidade() {return this.#dataValidade;}
    
    set codigo(novoCodigo) { this.#codigo=novoCodigo; } 
    set descricao(novaDescricao) { this.#descricao = novaDescricao; }
    set precoCusto(novoPrecoCusto) { this.#precoCusto = novoPrecoCusto; }
    set precoVenda(novoPrecoVenda) { this.#precoVenda = novoPrecoVenda; }
    set qtdEstoque(novaQtd) { this.#qtdEstoque = novaQtd; }
    set urlImagem(novaUrl) { this.#urlImagem=novaUrl; }
    set dataValidade(novaData) { this.#dataValidade = novaData; }


    //########### *** ##########//
    toJSON(){
        return {
            "codigo": this.#codigo,
            "descricao": this.#descricao,
            "precoCusto": this.#precoCusto,
            "precoVenda": this.#precoVenda,
            "qtdEstoque": this.#qtdEstoque,
            "urlImagem": this.#urlImagem,
            "dataValidade": this.#dataValidade
        }
    }

    async adicionar() {
        const produtoDAO = new DAO_Produto();
        await produtoDAO.adicionar(this); 
    }

    async remover() {
        const produtoDAO = new DAO_Produto();
        await produtoDAO.remover(this);
    }

    async alterar() {
        const produtoDAO = new DAO_Produto();
        await produtoDAO.alterar(this);
    }

    async buscarAll() {
        const produtoDAO = new DAO_Produto();
        return await produtoDAO.buscarAll();
    }

    async consultar(termo) {
        const produtoDAO = new DAO_Produto();
        return await produtoDAO.consultar(termo);
    }
}