function atualizarContador() {
  const agora = new Date();
  
  const meiaNoite = new Date();
  meiaNoite.setHours(24, 0, 0, 0);

  const diferenca = meiaNoite - agora;

  const horas = Math.floor(diferenca / (1000 * 60 * 60));
  const minutos = Math.floor((diferenca % (1000 * 60 * 60)) / (1000 * 60));
  const segundos = Math.floor((diferenca % (1000 * 60)) / 1000);

  const hFormatado = String(horas).padStart(2, '0');
  const mFormatado = String(minutos).padStart(2, '0');
  const sFormatado = String(segundos).padStart(2, '0');

  const elementoContador = document.getElementById('contador');
  if (elementoContador) {
    elementoContador.textContent = `${hFormatado}:${mFormatado}:${sFormatado}`;
  }
}

atualizarContador();

setInterval(atualizarContador, 1000);