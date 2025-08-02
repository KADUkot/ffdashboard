// 🔑 Cole aqui sua configuração do Firebase
const firebaseConfig = {
  apiKey: "SUA_API_KEY",
  authDomain: "SEU_DOMINIO.firebaseapp.com",
  projectId: "SEU_ID",
  storageBucket: "SEU_BUCKET.appspot.com",
  messagingSenderId: "SEU_SENDER_ID",
  appId: "SEU_APP_ID"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

const form = document.getElementById('playerForm');
form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const data = {
    name: form.name.value,
    photo: form.photo.value,
    kills: parseInt(form.kills.value),
    damage: parseInt(form.damage.value)
  };
  await db.collection('players').add(data);
  alert('Jogador salvo!');
  form.reset();
  loadPlayers();
});

async function loadPlayers() {
  const snapshot = await db.collection('players').get();
  const container = document.getElementById('players');
  container.innerHTML = '';
  const names = [];
  const kills = [];

  snapshot.forEach(doc => {
    const player = doc.data();
    const card = document.createElement('div');
    card.className = 'player-card';
    card.innerHTML = `
      <img src="${player.photo}" width="100"><br>
      <strong>${player.name}</strong><br>
      Kills: ${player.kills}<br>
      Damage: ${player.damage}
    `;
    container.appendChild(card);
    names.push(player.name);
    kills.push(player.kills);
  });

  const ctx = document.getElementById('killsChart').getContext('2d');
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: names,
      datasets: [{
        label: 'Kills por Jogador',
        data: kills,
        backgroundColor: 'rgba(54, 162, 235, 0.5)'
      }]
    }
  });
}

loadPlayers();
