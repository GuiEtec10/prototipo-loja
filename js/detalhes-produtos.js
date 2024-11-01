async function carregarProduto() {
  const params = new URLSearchParams(window.location.search);
  const produtoId = parseInt(params.get("id"));

  const response = await fetch("produtos.json");
  const produtos = await response.json();

  const produto = produtos.find((p) => p.id === produtoId);

  if (produto) {
    // Construindo o HTML para o produto e o carrossel de imagens
    document.getElementById("produto-detalhes").innerHTML = `
        <div id="image-carousel">
          <button id="prev-btn">
            <svg fill="#000000" height="800px" width="800px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" 
            viewBox="0 0 330.002 330.002" xml:space="preserve">
            <path id="XMLID_227_" d="M233.25,306.001L127.5,165.005L233.25,24.001c4.971-6.628,3.627-16.03-3-21c-6.627-4.971-16.03-3.626-21,3
            L96.75,156.005c-4,5.333-4,12.667,0,18l112.5,149.996c2.947,3.93,7.451,6.001,12.012,6.001c3.131,0,6.29-0.978,8.988-3.001
            C236.878,322.03,238.221,312.628,233.25,306.001z"/>
            </svg>
          </button>
          <div id="image-display"></div>
          <button id="next-btn">
            <svg fill="#000000" height="800px" width="800px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" 
            viewBox="0 0 330 330" xml:space="preserve">
            <path id="XMLID_222_" d="M250.606,154.389l-150-149.996c-5.857-5.858-15.355-5.858-21.213,0.001
            c-5.857,5.858-5.857,15.355,0.001,21.213l139.393,139.39L79.393,304.394c-5.857,5.858-5.857,15.355,0.001,21.213
            C82.322,328.536,86.161,330,90,330s7.678-1.464,10.607-4.394l149.999-150.004c2.814-2.813,4.394-6.628,4.394-10.606
            C255,161.018,253.42,157.202,250.606,154.389z"/>
            </svg>
          </button>
        </div>
        <div class="textos">
          <h2 class="produto-nome">${produto.nome}</h2>
          <p class="produto-price">R$${produto.price.toFixed(2)}</p>
          <button class="add-carrinho" id="add-cart" onclick="adicionarAoCarrinho({ nome: '${
            produto.nome
          }', price: ${produto.price} })">
            <i class="bi bi-cart3"></i> Adicionar ao Carrinho 
          </button> 
        </div>
    `;

    // Adicionando as imagens ao carrossel
    const imageDisplay = document.getElementById('image-display');
    produto.imagens.forEach((imgSrc, index) => {
      const imgElement = document.createElement('img');
      imgElement.src = imgSrc;
      imgElement.classList.add('carousel-image');
      if (index === 0) imgElement.classList.add('active'); // Exibe a primeira imagem
      imageDisplay.appendChild(imgElement);
    });

    // Navegação do carrossel
    let currentIndex = 0;
    const images = document.querySelectorAll('.carousel-image');

    document.getElementById('prev-btn').onclick = () => {
      currentIndex = (currentIndex > 0) ? currentIndex - 1 : images.length - 1;
      updateActiveImage(currentIndex);
    };
    document.getElementById('next-btn').onclick = () => {
      currentIndex = (currentIndex < images.length - 1) ? currentIndex + 1 : 0;
      updateActiveImage(currentIndex);
    };

    // Função para atualizar a imagem ativa
    function updateActiveImage(index) {
      images.forEach(img => img.classList.remove('active'));
      images[index].classList.add('active');
    }
  } else {
    document.getElementById("produto-detalhes").innerHTML = `<p>Produto não encontrado.</p>`;
  }
}

// Carregar produto ao iniciar
carregarProduto();
