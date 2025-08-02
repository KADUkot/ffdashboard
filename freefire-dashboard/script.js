function atualizarDados() {
  const kills = Math.floor(Math.random() * 100);
  document.getElementById('kills').textContent = `Abates: ${kills}`;
}
