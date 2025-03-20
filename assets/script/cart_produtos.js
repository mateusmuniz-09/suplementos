/* ----------Variaveis Globais--------- */

const modal = document.getElementById("modal");
const abriModal = document.querySelectorAll(".div-swiper");
const btnfecharModal = document.querySelector(".fecharModal");
const overlayModal = document.querySelector(".overlay-modal");
const imgModal = modal.querySelector(".img-modal");
const descriModal = document.querySelector(".modal-description");
const priceModal = document.querySelector(".modal-price");
const qtdModal = document.getElementById("contador");
const increModal = document.querySelector(".increase");
const decreModal = document.querySelector(".decrease");
let precoUnitario = 0;
const btnAdicionar = document.getElementById("btn-addModal");
const cartItem = document.getElementById("carrinho-itens");
const totalCarrinho = document.getElementById("valor-total");
let carrinho = [];
let valorTotal = 0;
let contadorCart = document.getElementById("cart-contador");
const btnCarrinho = document.getElementById("menu-carrinho");
const btnAbrir = document.getElementById("abrir-carrinho");
const btnFechar = document.getElementById("fechar-carrinho");
const overlayCarrinho = document.getElementById("overlay-carrinho");
const abrirMenu = document.getElementById("abrirMenu");
const menuMobile = document.getElementById("menu-mobile");
const overlay = document.getElementById("overlay");

/* ----------Variaveis Globais --------*/
btnAbrir.addEventListener("click", () => {
  btnCarrinho.classList.add("ativo");
  overlayCarrinho.classList.add("enable");
});

btnFechar.addEventListener("click", () => {
  btnCarrinho.classList.remove("ativo");
  overlayCarrinho.classList.remove("enable");
});
overlayCarrinho.addEventListener("click", () => {
  btnCarrinho.classList.remove("ativo");
  overlayCarrinho.classList.remove("enable");
});

abrirMenu.addEventListener("click", () => {
  menuMobile.classList.add("show");
  overlay.classList.add("open");
});
menuMobile.addEventListener("click", () => {
  menuMobile.classList.remove("show");
  overlay.classList.remove("open");
});

overlay.addEventListener("click", () => {
  menuMobile.classList.remove("show");
  overlay.classList.remove("open");
});

/* ----------carregar modal --------*/

abriModal.forEach((card) => {
  card.addEventListener("click", function () {
    const imgCard = card.querySelector(".img-card").src;
    const description = card.querySelector(".texto-description").textContent;
    const cardPrice = card.querySelector(".texto-slide").textContent;
    imgModal.src = imgCard;
    descriModal.textContent = description;
    priceModal.textContent = cardPrice;
    qtdModal.textContent = 1;

    precoUnitario = parseFloat(
      cardPrice.replace("R$", "").replace(",", ".").trim()
    );
    atualizarPrecoModal(1);
    abrirModal();
  });
});

overlayModal.addEventListener("click", fecharModal);
btnfecharModal.addEventListener("click", fecharModal);
/* ----------carregar modal--------*/

function abrirModal() {
  modal.classList.add("visible");
  overlayModal.classList.add("open");
}

function fecharModal() {
  modal.classList.remove("visible");
  overlayModal.classList.remove("open");
}

function atualizarPrecoModal(quantidade) {
  const precoTotal = (precoUnitario * quantidade).toFixed(2);
  priceModal.textContent = `R$ ${precoTotal}`;
}

// Aumentar quantidade no modal
increModal.addEventListener("click", () => {
  let quantidade = parseInt(qtdModal.textContent);
  quantidade++;
  qtdModal.textContent = quantidade;
  atualizarPrecoModal(quantidade);
});

// Diminuir quantidade no modal
decreModal.addEventListener("click", () => {
  let quantidade = parseInt(qtdModal.textContent);
  if (quantidade > 1) {
    quantidade--;
    qtdModal.textContent = quantidade;
    atualizarPrecoModal(quantidade);
  }
});

/* ---------------adicionar ao carrinho--------------------- */

// Adicionar item ao carrinho
btnAdicionar.addEventListener("click", () => {
  const nome = descriModal.textContent;
  const quantidade = parseInt(qtdModal.textContent);
  const preco = precoUnitario;
  const precoTotalItem = parseFloat((preco * quantidade).toFixed(2));

  let itemExistente = carrinho.find((item) => item.nome === nome);

  if (itemExistente) {
    itemExistente.quantidade += quantidade;
    itemExistente.precoTotal = parseFloat(
      (itemExistente.quantidade * preco).toFixed(2)
    );
  } else {
    carrinho.push({
      nome,
      preco,
      quantidade,
      precoTotal: precoTotalItem,
    });
  }
  fecharModal();
  atualizarCarrinho();
  Swal.fire({
    title: "Item Adicionado!",
    text: "Seu item foi adicionado aos pedidos 💪",
    icon: "success",
    timer: 2500,
    showConfirmButton: false,
  });
});

// Atualiza a interface do carrinho
function atualizarCarrinho() {
  cartItem.innerHTML = "";
  valorTotal = 0;
  carrinho.forEach((item, index) => {
    const itemDiv = document.createElement("div");
    itemDiv.classList.add("item");

    itemDiv.innerHTML = `
    <div class="itens-carts">
             <span>${item.nome}- R$ ${item.precoTotal.toFixed(2)} </span>
             <div> 
              <button class="menosQuantidade" data-index="${index}">-</button>
               ${item.quantidade} 
              <button class="maisQuantidade" data-index="${index}">+</button>
              </div>
              </div>
          `;

    cartItem.appendChild(itemDiv);
    valorTotal += item.precoTotal;

    event.stopPropagation();
  });

  contadorCart.innerHTML = carrinho.length;
  if (carrinho.length === 0) {
    contadorCart.classList.remove("cartCount");
    contadorCart.textContent = "";
    btnAbrir.classList.remove("cheio");
    btnCarrinho.classList.remove("ativo");
    overlayCarrinho.classList.remove("enable");
  } else {
    contadorCart.classList.add("cartCount");
    btnAbrir.classList.add("cheio");
  }

  totalCarrinho.textContent = `Total: R$ ${valorTotal.toFixed(2)}`;

  document.querySelectorAll(".maisQuantidade").forEach((button) => {
    button.addEventListener("click", () =>
      alterarQuantidade(button.dataset.index, 1)
    );
  });

  document.querySelectorAll(".menosQuantidade").forEach((button) => {
    button.addEventListener("click", () =>
      alterarQuantidade(button.dataset.index, -1)
    );
  });
}

// Função para alterar quantidade no carrinho
function alterarQuantidade(index, quantidade) {
  index = parseInt(index);
  let item = carrinho[index];
  if (item) {
    item.quantidade += quantidade;
    if (item.quantidade <= 0) {
      carrinho.splice(index, 1);
    } else {
      item.precoTotal = parseFloat((item.quantidade * item.preco).toFixed(2));
    }
  }
  atualizarCarrinho();
}

function enviarParaWhatsapp() {
  const enderecoCliente = document
    .getElementById("endereco-cliente")
    .value.trim();
  const nomeCliente = document.getElementById("nome-cliente").value.trim();
  const obsCliente = document.getElementById("obs-cliente").value.trim();
  const pagamentoSelecionado = document.querySelector(
    'input[name="pagamento"]:checked'
  );

  if (!nomeCliente || !enderecoCliente || !pagamentoSelecionado) {
    alert(
      "⚠️ Preencha todos os campos obrigatórios antes de finalizar a compra."
    );
    return false;
  }

  let metodoPagamento = pagamentoSelecionado.value;
  /* let valorRecebido = */
  /* parseFloat(document.getElementById("valorPago").value) || 0;
  let valorformatado =
    metodoPagamento === "dinheiro" ? valorRecebido.toFixed(2) : "0.00"; */

  let mensagem = `👋 Olá *SupraForce*! Vim pelo seu site: https://seusuplemento.netlify.app/ 💪\n\n`;
  mensagem += ` 💪 *MEU PEDIDO:* \n\n`;

  carrinho.forEach((item) => {
    mensagem += `   - *${item.nome.replace("_", " ")}*\n`;
    mensagem += `   - *Quantidade:* ${item.quantidade}\n`;
    mensagem += `   - *Preço unitário:* R$ ${item.preco.toFixed(2)}\n\n`;
    mensagem += `   - 💰 *Subtotal:* R$ ${item.precoTotal.toFixed(2)}\n\n`;
  });
  mensagem += `💵 *TOTAL A PAGAR:* R$ ${valorTotal.toFixed(2)}\n\n`;

  mensagem += `📝 *Dados do Cliente:*\n\n`;
  mensagem += `👤 *Nome:* ${nomeCliente}\n`;
  mensagem += `📌 *Endereço:* ${enderecoCliente}\n`;
  mensagem += `💳 *Forma de Pagamento:* ${metodoPagamento}\n`;
  mensagem += `✍️ *Observação:* ${obsCliente || "Nenhuma"}\n\n`;

  const numeroWhatsapp = "5588981252883"; // Certifique-se que o número está correto
  const url = `https://wa.me/${numeroWhatsapp}?text=${encodeURIComponent(
    mensagem
  )}`;

  window.open(url, "_blank");
  return true;
}

function finalizarCompra() {
  if (carrinho.length === 0) {
    alert("⚠️ Seu carrinho está vazio😐");
    return;
  }

  // Tenta enviar o pedido. Se falhar, não limpa o carrinho
  const pedidoEnviado = enviarParaWhatsapp();
  if (!pedidoEnviado) {
    return;
  }

  // Limpa o carrinho e redefine o total
  carrinho = [];
  atualizarCarrinho();
  alert("✅ Pedido enviado com sucesso! O carrinho foi esvaziado.");
  location.reload();
}
