document.addEventListener('DOMContentLoaded', () => {
  // Seleciona o formulário de busca da navbar
  const formBusca = document.querySelector('form[role="search"]');

  if (!formBusca) return;

  formBusca.addEventListener('submit', (event) => {
    event.preventDefault(); // Impede o recarregamento da página

    const inputBusca = formBusca.querySelector('input[type="search"]');
    const termo = inputBusca ? inputBusca.value.trim().toLowerCase() : '';

    // Verifica em qual página o usuário está atualmente
    const paginaAtual = window.location.pathname;

    if (paginaAtual.includes('cardapio.html')) {
      // Estamos na página do cardápio: filtra as pizzas exibidas
      filtrarCardapio(termo);
    } else {
      // Estamos no index.html, detalhes.html ou outra página
      alert('A busca por produtos só funciona na página de Cardápio! Redirecionando...');
      // Opcional: redireciona o usuário para o cardápio
      window.location.href = 'cardapio.html';
    }
  });
});

// Função para filtrar os cards no cardapio.html
function filtrarCardapio(termo) {
  const container = document.getElementById('container-produtos');
  if (!container) return;

  const cards = container.querySelectorAll('.card');
  let encontrou = false;

  cards.forEach((card) => {
    const titulo = card.querySelector('.card-title')?.textContent.toLowerCase() || '';
    const descricao = card.querySelector('.card-text')?.textContent.toLowerCase() || '';

    // Verifica se o termo pesquisado está no título ou na descrição
    if (titulo.includes(termo) || descricao.includes(termo)) {
      card.style.display = 'block'; // Exibe o card
      encontrou = true;
    } else {
      card.style.display = 'none'; // Esconde o card
    }
  });

  // Mensagem caso nenhuma pizza atenda à busca
  let msgNaoEncontrado = document.getElementById('msg-busca-vazia');
  if (!encontrou) {
    if (!msgNaoEncontrado) {
      msgNaoEncontrado = document.createElement('div');
      msgNaoEncontrado.id = 'msg-busca-vazia';
      msgNaoEncontrado.className = 'alert alert-info text-center w-100 my-4';
      msgNaoEncontrado.textContent = 'Nenhuma pizza encontrada com o termo pesquisado.';
      container.appendChild(msgNaoEncontrado);
    }
  } else if (msgNaoEncontrado) {
    msgNaoEncontrado.remove();
  }
}