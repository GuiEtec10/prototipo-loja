async function carregarProduto() {
  const params = new URLSearchParams(window.location.search);
  const produtoId = parseInt(params.get("id"));

  const response = await fetch("produtos.json");
  const produtos = await response.json();

  const produto = produtos.find((p) => p.id === produtoId);

  if (produto) {
    document.getElementById("produto-detalhes").innerHTML = `
        <img src="${produto.imagem}" alt="${produto.nome}" class="produto-img">
        <div class="textos">
        <h2 class="produto-nome">${produto.nome}</h2>
        <p class="produto-preco">R$${produto.preco.toFixed(2)}</p>
        <p class="produto-descricao">${produto.descricao}</p>
          <button class="add-carrinho" id="add-cart" onclick="adicionarAoCarrinho({ nome: '${
            produto.nome
          }', preco: ${
      produto.preco
    } })"> <i class="bi bi-cart3"></i> Adicionar ao Carrinho </button> 
        </div>
        `;
  } else {
    document.getElementById(
      "produto-detalhes"
    ).innerHTML = `<p>Produto não encontrado.</p>`;
  }
}

carregarProduto();
