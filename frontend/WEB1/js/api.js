// WEB1/js/api.js
// Sólo envía nuevos items al backend. No carga ni muestra la lista.
(() => {
  const API_POST = 'http://192.168.1.11:3000/api/items'; // usa la IP/puerto de tu backend
  const container = document.getElementById('api-response');

  if (!container) return;

  container.innerHTML = `
    <form id="itemForm" style="display:flex;gap:8px;align-items:center">
      <input id="itemName" placeholder="Nuevo item (se guardará en BD)" required style="padding:6px"/>
      <input id="itemName" placeholder="Nuevo item2 (se guardará en BD)" required style="padding:6px"/>
      <input id="itemName" placeholder="Nuevo item3(se guardará en BD)" required style="padding:6px"/>
      <input id="itemName" placeholder="Nuevo item4(se guardará en BD)" required style="padding:6px"/>
      <input id="itemName" placeholder="Nuevo item5(se guardará en BD)" required style="padding:6px"/>
      <button type="submit">Guardar</button>
      form.reset();
      loadDailyRegisters();


      <span id="apiMsg" style="margin-left:8px;color:#0a58ca"></span>
    </form>

    <h3>Daily Register</h3>

<form id="daily-form" style="display:flex;flex-direction:column;gap:8px;max-width:400px">

  <label>
    Tareas
    <input type="text" name="tareas" placeholder="Qué tareas hiciste hoy" required>
  </label>

  <label>
    Ejercicio
    <input type="text" name="ejercicio" placeholder="Ej: gym, caminar..." required>
  </label>

  <label>
    Oración
    <input type="text" name="oracion" placeholder="Tiempo o tipo" required>
  </label>

  <label>
    Lectura
    <input type="text" name="lectura" placeholder="Libro / páginas" required>
  </label>

  <label>
    Inglés
    <input type="text" name="ingles" placeholder="Tiempo o actividad" required>
  </label>

  <button type="submit">Guardar registro</button>
</form>

<div id="form-message"></div>
<h3 style="margin-top:20px">Registros guardados</h3>
<ul id="daily-list" style="padding-left:18px"></ul>


 
<div id="form-message"></div>


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

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('daily-form');
  const message = document.getElementById('form-message');

  loadDailyRegisters();


  if (!form) {
    console.error('Form not found');
    return;
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault(); // 🚫 no recargar página

    const formData = new FormData(form);

    const payload = {
      tareas: formData.get('tareas'),
      ejercicio: formData.get('ejercicio'),
      oracion: formData.get('oracion'),
      lectura: formData.get('lectura'),
      ingles: formData.get('ingles')
    };

    try {
      const response = await fetch('/api/daily-register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error('Error saving data');
      }

      const data = await response.json();

      message.style.color = 'green';
      message.textContent = 'Registro guardado correctamente ✅';

      form.reset();

      console.log('Saved:', data);

    } catch (error) {
      console.error(error);
      message.style.color = 'red';
      message.textContent = 'Error al guardar el registro ❌';
    }
  });
});

async function loadDailyRegisters() {
  const list = document.getElementById('daily-list');
  if (!list) return;

  list.innerHTML = '<li>Cargando...</li>';

  try {
    const res = await fetch('/api/daily-register');
    if (!res.ok) throw new Error('Error loading data');

    const data = await res.json();

    if (!data.length) {
      list.innerHTML = '<li>No hay registros todavía</li>';
      return;
    }

    list.innerHTML = '';

    data.forEach(item => {
      const li = document.createElement('li');
      li.textContent = `
        ${item.tareas} | ${item.ejercicio} | ${item.oracion} |
        ${item.lectura} | ${item.ingles} |
        ${new Date(item.created_at).toLocaleString()}
      `;
      list.appendChild(li);
    });

  } catch (err) {
    console.error(err);
    list.innerHTML = '<li>Error cargando registros</li>';
  }
}
