function cerrarSesion() {
  localStorage.removeItem('token');
  window.location.href = 'login.html';
}
