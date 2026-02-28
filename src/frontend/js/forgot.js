// Script para recuperación de contraseña

document.getElementById('forgot-form').addEventListener('submit', async function(e) {
  e.preventDefault();
  const email = document.getElementById('forgot-email').value;
  const infoDiv = document.getElementById('forgot-info');
  const errorDiv = document.getElementById('forgot-error');
  infoDiv.style.display = 'none';
  errorDiv.style.display = 'none';
  try {
    // Aquí deberías implementar la lógica real de recuperación en el backend
    // Por ahora solo mostramos un mensaje simulado
    infoDiv.textContent = 'Si el correo está registrado, recibirás un enlace para restablecer tu contraseña.';
    infoDiv.style.display = 'block';
  } catch (err) {
    errorDiv.textContent = 'Error de conexión con el servidor';
    errorDiv.style.display = 'block';
  }
});

// Recuperación de contraseña (más simple)
// Cuando el usuario envía el formulario, mostramos un mensaje informativo
document.getElementById('forgot-form').addEventListener('submit', function(e) {
  e.preventDefault();
  // Oculta mensajes previos
  document.getElementById('forgot-info').style.display = 'none';
  document.getElementById('forgot-error').style.display = 'none';
  // Muestra mensaje informativo
  document.getElementById('forgot-info').textContent = 'Si el correo está registrado, recibirás un enlace para restablecer tu contraseña.';
  document.getElementById('forgot-info').style.display = 'block';
});
