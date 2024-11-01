async function carregarProdutos() {
  try {
    const response = await fetch("produtos.json");
    const produtos = await response.json();

    const container = document.getElementById("area-produtos");
    container.innerHTML = "";

    produtos.forEach((produto) => {
      const produtoDiv = document.createElement("div");
      produtoDiv.classList.add("produto");

      produtoDiv.innerHTML = `
                <a href="detalhes.html?id=${produto.id}">
                    <img src="${produto.imagens}" alt="${produto.nome}" class="img-produto" />
                    <h3 class="nome-produto">${produto.nome}</h3>
                    <h4 class="price-produto">R$${produto.price}</h4>
                </a>
                <button class="add-carrinho" onclick="adicionarAoCarrinho({ nome: '${produto.nome}', price: ${produto.price} })">
                    <i class="bi bi-cart3"></i>
                </button>
            `;

      container.appendChild(produtoDiv);
    });
  } catch (error) {
    console.error("Erro ao carregar produtos:", error);
  }
}

carregarProdutos();
