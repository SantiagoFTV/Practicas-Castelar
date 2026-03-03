// Script para registro de usuario

document.getElementById('register-form').addEventListener('submit', async function(e) {
  e.preventDefault();
  const username = document.getElementById('reg-username').value;
  const email = document.getElementById('reg-email').value;
  const password = document.getElementById('reg-password').value;
  const errorDiv = document.getElementById('register-error');
  errorDiv.style.display = 'none';
  try {
    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, email, password })
    });
    const data = await res.json();
    if (res.ok) {
      window.location.href = 'login.html';
    } else {
      errorDiv.textContent = data.message || 'Error en el registro';
      errorDiv.style.display = 'block';
    }
  } catch (err) {
    errorDiv.textContent = 'Error de conexión con el servidor';
    errorDiv.style.display = 'block';
  }
});
