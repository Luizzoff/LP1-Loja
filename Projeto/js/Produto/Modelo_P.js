class Modelo_Produto{
    //Atributos privados
    #codigo; #descricao; #precoCusto; #precoVenda; #qtdEstoque; #urlImagem; #dataValidade;
    //#################### Constrói o Modelo do Produto ####################
    /* 
        É o incializador das variaveis privadas, Ex: int i = 0;
        Se codigo não for passado um valor pela instancia da chamada da classe Modelo_Produto
        ele recebera o valor padrao determinado dentro do constructor que é codigo = 0
    */
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
    //##################################################################################

    //==========================================================================================================

    //#################### Funções Solicitadas pelo Controle_Produto ####################
    toJSON(){
        //Converte a string do Modelo_Produto para o formato JSON 
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

    adicionar() {
        const ProdutoDAO = new DAO_Produto();
        //this referência a si mesmo, ou seja a sua propria class que é Modelo_Produto, para que DAO_Produto
        //verifique se ele é uma instancia de Modelo_Produto por meio de um argumento enviado, que é o proprio
        //"this".
        ProdutoDAO.adicionar(this); 
    }

    remover() {
        const ProdutoDAO = new DAO_Produto();
        ProdutoDAO.remover(this);
    }

    buscarAll() {
        const ProdutoDAO = new DAO_Produto();
        return ProdutoDAO.buscarAll();
    }
}