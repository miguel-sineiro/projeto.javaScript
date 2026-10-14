const NOME_RESTAURANTE = "PIZZA4ME";
// Endpoint oficial solicitado no enunciado da avaliação
const API_URL = `https://tech4produtos.fly.dev/produtos/restaurante=${NOME_RESTAURANTE}`;

// Dados locais de segurança (Caso a API externa bloqueie a conexão por CORS)
const PRODUTOS_PIZZA4ME = [
  {
    id: "1",
    nome: "Pizza de Calabresa",
    restaurante: "PIZZA4ME",
    imagem: "images (1).jpg",
    produto: "Pizza",
    descricao: "Feita de massa de farinha de trigo, queijo, molho e calabresa."
  },
  {
    id: "2",
    nome: "Pizza Marguerita",
    restaurante: "PIZZA4ME",
    imagem: "images.jpg",
    produto: "Pizza",
    descricao: "Feita de massa de farinha de trigo, molho, queijo, tomate, folha de manjericão e azeite."
  },
  {
    id: "3",
    nome: "Pizza de 4 Queijos",
    restaurante: "PIZZA4ME",
    imagem: "images (3).jpg",
    produto: "Pizza",
    descricao: "Feita de massa de farinha de trigo, molho, queijos: mussarela, parmesão, gorgonzola e provolone."
  },
  {
    id: "4",
    nome: "Pizza de Frango com Catupiry",
    restaurante: "PIZZA4ME",
    imagem: "images (4).jpg",
    produto: "Pizza",
    descricao: "Feita de massa de farinha de trigo, molho de tomate, queijo mussarela, frango desfiado e catupiry original."
  },
  {
    id: "5",
    nome: "Pizza Portuguesa",
    restaurante: "PIZZA4ME",
    imagem: "images (2).jpg",
    produto: "Pizza",
    descricao: "Feita de massa de farinha de trigo, molho, queijo mussarela, presunto, ovos, cebola, ervilha e azeitona."
  },
  {
    id: "6",
    nome: "Pizza de Chocolate com Morango",
    restaurante: "PIZZA4ME",
    imagem: "hq720.jpg",
    produto: "Pizza Doce",
    descricao: "Feita de massa de farinha de trigo, uma generosa camada de chocolate ao leite derretido e morangos frescos picados."
  }
];

function desenharCards(listaProdutos) {
  const container = document.getElementById('container-produtos');
  if (!container) return;

  container.innerHTML = '';

  listaProdutos.forEach((item) => {
    const idProduto = item.id || item._id;

    const card = document.createElement('div');
    card.className = 'card shadow-sm';
    card.style.width = '18rem';

    card.innerHTML = `
      <img src="${item.imagem}" class="card-img-top" alt="${item.nome}" style="height: 180px; object-fit: cover;">
      <div class="card-body d-flex flex-column justify-content-between">
        <div>
          <h5 class="card-title fw-bold">${item.nome}</h5>
          <p class="card-text text-muted">${item.descricao}</p>
        </div>
        <div class="mt-3">
          <span class="badge text-bg-success mb-2">${item.produto}</span>
          <a href="detalhes.html?id=${idProduto}" class="btn btn-primary w-100 fw-semibold">Ver Detalhes</a>
        </div>
      </div>
    `;

    container.appendChild(card);
  });
}

async function carregarCardapio() {
  try {
    // Realiza a requisição fetch exigida pela instrução do trabalho
    const resposta = await fetch(API_URL);

    if (!resposta.ok) {
      throw new Error(`Status da resposta: ${resposta.status}`);
    }

    const produtos = await resposta.json();

    if (produtos && produtos.length > 0) {
      desenharCards(produtos);
    } else {
      //desenharCards(PRODUTOS_PIZZA4ME);
    }
  } catch (erro) {
    console.warn("Instabilidade/CORS na API externa. Carregando cardápio...", erro);
    // Em caso de bloqueio por CORS ou erro de rede, renderiza os cards
    //desenharCards(PRODUTOS_PIZZA4ME);
  }
}

carregarCardapio();