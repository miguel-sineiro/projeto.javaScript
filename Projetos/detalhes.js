// Lista com os ficheiros de imagem locais correspondentes a cada pizza
const PRODUTOS_PIZZA4ME = [
  {
    id: "1",
    nome: "Pizza de Calabresa",
    restaurante: "PIZZA4ME",
    imagem: "images (1).jpg",
    produto: "Pizza",
    descricao: "A clássica pizza de calabresa combina massa crocante, molho de tomate fresco, queijo derretido e linguiça calabresa fatiada. É uma das opções mais pedidas no Brasil, famosa pelo seu sabor defumado e levemente picante, harmonizado com o dulçor da cebola e o toque aromático do orégano."
  },
  {
    id: "2",
    nome: "Pizza de Marguerita",
    restaurante: "PIZZA4ME",
    imagem: "images.jpg",
    produto: "Pizza",
    descricao: "A pizza Marguerita (ou Margherita) é um clássico da culinária italiana, famosa pela sua simplicidade. A receita tradicional leva apenas cinco ingredientes além da massa: molho de tomate, queijo muçarela (tradicional ou de búfala), fatias de tomate fresco, folhas de manjericão fresco e um fio de azeite."
  },
  {
    id: "3",
    nome: "Pizza de 4 Queijos",
    restaurante: "PIZZA4ME",
    imagem: "images (3).jpg",
    produto: "Pizza",
    descricao: "A pizza 4 queijos é um clássico que combina sabores suaves e intensos. A receita tradicional utiliza uma base de molho de tomate com uma combinação de queijos que derretem e contrastam entre si: muçarela (suave), provolone (defumado), gorgonzola (marcante e salgado) e parmesão ou requeijão cremoso."
  },
  {
    id: "4",
    nome: "Pizza de Frango com Catupiry",
    restaurante: "PIZZA4ME",
    imagem: "images (4).jpg",
    produto: "Pizza",
    descricao: "A pizza de frango com Catupiry é um clássico brasileiro criado nos anos 1970. Combina massa de fermentação natural ou tradicional, molho de tomate, queijo muçarela, peito de frango cozido e temperado (geralmente com alho, cebola e colorau), e o famoso requeijão cremoso Catupiry."
  },
  {
    id: "5",
    nome: "Pizza Portuguesa",
    restaurante: "PIZZA4ME",
    imagem: "images (2).jpg",
    produto: "Pizza",
    descricao: "A pizza portuguesa é um clássico brasileiro criado por imigrantes lusitanos. Leva uma base de molho de tomate e queijo muçarela, coberta por presunto fatiado ou em cubos, rodelas de cebola, ovo cozido, azeitonas (verdes ou pretas), ervilha e orégano. É finalizada com um fio de azeite."
  },
  {
    id: "6",
    nome: "Pizza Chocolate com Morango",
    restaurante: "PIZZA4ME",
    imagem: "hq720.jpg",
    produto: "Pizza Doce",
    descricao: "A combinação de chocolate com morango é um clássico da confeitaria que equilibra a doçura e a acidez. É muito utilizada em fondue, bombons (como a tradicional 'Surpresa de Morango' envolvida em brigadeiro branco) e sobremesas finas."
  }
];

function desenharDetalhes(produto) {
  const container = document.getElementById('detalhe-produto');
  if (!container) return;

  container.innerHTML = `
    <div class="card shadow border-0" style="max-width: 550px; width: 100%;">
      <img src="${produto.imagem}" class="card-img-top" alt="${produto.nome}" style="max-height: 320px; object-fit: cover;">
      <div class="card-body p-4">
        <div class="d-flex justify-content-between align-items-center mb-3">
          <h3 class="card-title fw-bold m-0">${produto.nome}</h3>
          <span class="badge text-bg-success fs-6">${produto.produto}</span>
        </div>
        <p class="card-text text-secondary lh-lg mb-4">${produto.descricao}</p>
        
        <button onclick="alert('Pedido Realizado com Sucesso!')" class="btn btn-warning w-100 fw-bold mb-2 py-2">
          Realizar Pedido
        </button>

        <a href="cardapio.html" class="btn btn-outline-secondary w-100 fw-semibold mt-2">
          ← Voltar ao Cardápio
        </a>
      </div>
    </div>
  `;
}

async function carregarDetalhes() {
  const container = document.getElementById('detalhe-produto');
  if (!container) return;

  const parametros = new URLSearchParams(window.location.search);
  const idProduto = parametros.get('id');

  if (!idProduto) {
    container.innerHTML = `
      <div class="alert alert-warning text-center w-100" role="alert">
        Nenhum produto foi selecionado. <a href="cardapio.html" class="alert-link">Voltar ao cardápio</a>.
      </div>`;
    return;
  }

  try {
    const resposta = await fetch(`https://tech4produtos.fly.dev/produtos/${idProduto}`);

    if (!resposta.ok) {
      throw new Error(`Erro na resposta da API: Status ${resposta.status}`);
    }

    const produto = await resposta.json();

    if (produto && produto.nome) {
      desenharDetalhes(produto);
    } else {
      carregarDadosLocais(idProduto);
    }
  } catch (erro) {
    carregarDadosLocais(idProduto);
  }
}

function carregarDadosLocais(idProduto) {
  const container = document.getElementById('detalhe-produto');
  const produtoLocal = PRODUTOS_PIZZA4ME.find(p => p.id === idProduto || p.id === String(idProduto));

  if (produtoLocal) {
    desenharDetalhes(produtoLocal);
  } else {
    container.innerHTML = `
      <div class="alert alert-danger text-center w-100" role="alert">
        Produto não encontrado. <a href="cardapio.html" class="alert-link">Voltar ao cardápio</a>.
      </div>`;
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', carregarDetalhes);
} else {
  carregarDetalhes();
}