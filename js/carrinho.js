let carrinho = [];
let num_carrinho = 0;
const botao_flutuante = document.getElementById("botao-flutuante");

function carregarCarrinho() {
  const carrinhoSalvo = JSON.parse(localStorage.getItem('carrinho')) || [];
  carrinho = carrinhoSalvo;
  num_carrinho = carrinho.length;

  botao_flutuante.innerHTML = num_carrinho > 0 ? `<i class='bi bi-cart3'>${num_carrinho}</i>` : `<i class='bi bi-cart3'></i>`;
  atualizarCarrinhoMenu();
}

function adicionarAoCarrinho(produto) {
  carrinho.push(produto);
  localStorage.setItem('carrinho', JSON.stringify(carrinho)); 
  atualizarCarrinhoMenu();
  num_carrinho++;
  botao_flutuante.innerHTML = `<i class='bi bi-cart3'>${num_carrinho}</i>`;
}

function atualizarCarrinhoMenu() {
  const carrinhoMenuElement = document.getElementById("carrinho-menu");
  carrinhoMenuElement.innerHTML = "";
  let total = 0;

  carrinho.forEach((produto) => {
    carrinhoMenuElement.innerHTML += `<li> <div class="org_prod_cart"> <button class="BT-removerDoCarrinho" onclick="removerDoCarrinho('${produto.nome}')"><i class="bi bi-x"></i> ${produto.nome}</button> <button class="BT-removerDoCarrinho preco" onclick="removerDoCarrinho('${produto.nome}')">R$${produto.preco.toFixed(2)}</button> </div> </li>`;
    total += produto.preco;
  });

  carrinhoMenuElement.innerHTML += `<strong>Total: R$${total.toFixed(2)}</strong>`;
}

function removerDoCarrinho(nomeProduto) {
  const index = carrinho.findIndex((produto) => produto.nome === nomeProduto);
  if (index > -1) {
    carrinho.splice(index, 1);
  }
  localStorage.setItem('carrinho', JSON.stringify(carrinho)); 
  atualizarCarrinhoMenu();
  num_carrinho--;
  if (num_carrinho === 0) {
    botao_flutuante.innerHTML = `<i class='bi bi-cart3'></i>`;
  } else {
    botao_flutuante.innerHTML = `<i class='bi bi-cart3'>${num_carrinho}</i>`;
  }
}

function comprar() {
  let mensagem = "";
  let total = 0;
  const mensagem_inicial = "Olá! Acabei de adicionar as seguintes coisas ao meu carrinho: ";

  carrinho.forEach((produto) => {
    mensagem += `- ${produto.nome} .... R$${produto.preco.toFixed(2)}\n`;
    total += produto.preco;
  });

  if (total === 0) {
    window.alert("Parece que você ainda não escolheu nada! Explore nossa loja e adicione seus itens favoritos ao carrinho!");
  } else {
    const numeroWhatsApp = "5511969666306";
    const mensagemCompleta = `${mensagem_inicial}\n${mensagem}\nTotal R$${total.toFixed(2)}\nPoderia me ajudar a finalizar a compra? `;
    window.open(`https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensagemCompleta)}`);
  }
}

function toggleMenu() {
  const menuLateral = document.getElementById("menu-lateral");
  const isVisible = menuLateral.style.right === "0px";

  menuLateral.style.right = isVisible ? "-300px" : "0px";
  atualizarCarrinhoMenu();
}

window.onload = carregarCarrinho;

// Menu Hambúrguer (Menu para telas de celular)
const menuToggle = document.getElementById("menu-toggle");
const navbar = document.getElementById("navbar");
const closeMenu = document.getElementById("close-menu");

menuToggle.addEventListener("click", () => {
  navbar.classList.add("open");
});

closeMenu.addEventListener("click", () => {
  navbar.classList.remove("open");
});