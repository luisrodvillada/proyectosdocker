// WEB1/js/api.js
// Sólo envía nuevos items al backend. No carga ni muestra la lista.
(() => {
  const API_POST = 'http://192.168.1.11:3000/api/items'; // usa la IP/puerto de tu backend
  const container = document.getElementById('api-response');

  if (!container) return;

  container.innerHTML = `
    <form id="itemForm" style="display:flex;gap:8px;align-items:center">
      <input id="itemName" placeholder="Nuevo item (se guardará en BD)" required style="padding:6px"/>
      <button type="submit">Guardar</button>
      <span id="apiMsg" style="margin-left:8px;color:#0a58ca"></span>
    </form>
    <div style="margin-top:8px;color:#666;font-size:13px">
      Los items no se mostrarán en esta web, sólo se guardan en la base de datos.
    </div>
  `;

  const form = document.getElementById('itemForm');
  const nameInput = document.getElementById('itemName');
  const msg = document.getElementById('apiMsg');

  form.addEventListener('submit', async (ev) => {
    ev.preventDefault();
    msg.textContent = '';
    const name = nameInput.value.trim();
    if (!name) return;
    try {
      const res = await fetch(API_POST, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name })
      });
      if (!res.ok) {
        const text = await res.text();
        msg.style.color = '#b00';
        msg.textContent = `Error ${res.status}`;
        console.error('POST error', res.status, text);
        return;
      }
      // éxito: limpiar campo y mostrar confirmación breve
      nameInput.value = '';
      msg.style.color = '#0a58ca';
      msg.textContent = 'Guardado';
      setTimeout(() => { msg.textContent = ''; }, 2500);
    } catch (err) {
      msg.style.color = '#b00';
      msg.textContent = 'Error de red';
      console.error('Network error', err);
    }
  });
})();