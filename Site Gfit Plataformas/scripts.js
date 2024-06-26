const items = [
    {id: 0, nome: 'Plano MENSAL', descricao: 'Assinatura Mensal para assistir aos melhores conteúdos.', preco: 21.90, img: 'w1.png', quantidade: 0},
    {id: 1, nome: 'Plano TRIMESTRAL', descricao: 'Assinatura Trimestral para assistir aos melhores conteúdos.', preco: 54.90, img: 'w2.png', quantidade: 0},
    {id: 2, nome: 'Plano ANUAL', descricao: 'Assinatura Anual para assistir aos melhores conteúdos.', preco: 139.90, img: 'w3.png', quantidade: 0},
    {id: 3, nome: 'Plano MENSAL', descricao: 'Assinatura mensal para acesso ilimitado a filmes e séries.', preco: 14.90, img: 'w4.png', quantidade: 0},
    {id: 4, nome: 'Plano TRIMESTRAL', descricao: 'Assinatura trimestral para acesso ilimitado a filmes e séries, com os melhores lançamentos.', preco: 39.90, img: 'w5.png', quantidade: 0},
    {id: 5, nome: 'Plano ANUAL', descricao: 'Assinatura anual para os maiores fãs de streaming.', preco: 110.90, img: 'w6.png', quantidade: 0},
    {id: 6, nome: 'Plano MENSAL', descricao: 'Assinatura mensal para acesso ilimitado TV a filmes e séries.', preco: 32.90, img: 'w7.png', quantidade: 0},
    {id: 7, nome: 'Plano TRIMESTRAL', descricao: 'Assinatura mensal para acesso ilimitado TV a filmes e séries.', preco: 89.90, img: 'w8.png', quantidade: 0},
    {id: 8, nome: 'Plano ANUAL', descricao: 'Assinatura mensal para acesso ilimitado TV a filmes e séries.', preco: 219.90, img: 'w9.png', quantidade: 0},
    {id: 9, nome: 'Plano MENSAL', descricao: 'Assinatura mensal para acesso ilimitado a filmes e séries.', preco: 20.90, img: 'w10.png', quantidade: 0},
    {id: 10, nome: 'Plano TRIMESTRAL', descricao: 'Assinatura mensal para acesso ilimitado a filmes e séries.', preco: 54.90, img: 'w11.png', quantidade: 0},
    {id: 11, nome: 'Plano ANUAL', descricao: 'Assinatura mensal para acesso ilimitado a filmes e séries.', preco: 140.90, img: 'w12.png', quantidade: 0}
];

const inicializarLoja = () => {
    const containerProdutos = document.getElementById('planos');
    items.forEach((val) => {
        containerProdutos.innerHTML += `
            <div class="produto single-produto">
                <img src="${val.img}" alt="${val.nome}" />
                <div class="info">
                    <h2>${val.nome}</h2>
                    <p>${val.descricao}</p>
                    <p class="preco">R$ ${val.preco.toFixed(2)}</p>
                    <a class="botao-comprar" key="${val.id}" href="#"><i class="fas fa-shopping-cart"></i> Comprar</a>
                </div>
            </div>`;
    });
    adicionarEventosDeCompra();
};

const atualizarCarrinho = () => {
    const containerCarrinho = document.getElementById('itens-carrinho');
    const totalCarrinho = document.getElementById('total-carrinho');
    containerCarrinho.innerHTML = '';
    let total = 0;
    items.forEach((val, index) => {
        if (val.quantidade > 0) {
            containerCarrinho.innerHTML += `
                <div class="item-carrinho">
                    <p>${val.nome} | Quantidade: ${val.quantidade} | Total: R$ ${(val.preco * val.quantidade).toFixed(2)}</p>
                    <a href="#" class="botao-remover" data-index="${index}"><i class="fas fa-trash-alt"></i> Excluir</a>
                </div>`;
            total += val.preco * val.quantidade;
        }
    });
    totalCarrinho.innerHTML = `Total: R$ ${total.toFixed(2)}`;
    document.getElementById('carrinho').classList.add('active');
    localStorage.setItem('carrinho', JSON.stringify(items));
    adicionarEventosDeRemocao();
};

const adicionarEventosDeCompra = () => {
    const links = document.getElementsByClassName('botao-comprar');
    for (let i = 0; i < links.length; i++) {
        links[i].addEventListener('click', function() {
            const key = this.getAttribute('key');
            items[key].quantidade++;
            atualizarCarrinho();
            return false;
        });
    }
};

const adicionarEventosDeRemocao = () => {
    const links = document.getElementsByClassName('botao-remover');
    for (let i = 0; i < links.length; i++) {
        links[i].addEventListener('click', function(e) {
            e.preventDefault();
            const index = this.getAttribute('data-index');
            items[index].quantidade = 0;
            atualizarCarrinho();
        });
    }
};

document.getElementById('fechar-compra').addEventListener('click', function() {
    localStorage.setItem('carrinho', JSON.stringify(items));
    window.location.href = 'pagamento.html';
});

inicializarLoja();
