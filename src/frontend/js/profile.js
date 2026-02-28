// Script para subir imagen y comentarios positivos

document.addEventListener('DOMContentLoaded', () => {
  const profileForm = document.getElementById('profile-form');
  const profileMessage = document.getElementById('profile-message');

  if (profileForm) {
    profileForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const imageInput = document.getElementById('profile-image');
      const comment1 = document.getElementById('comment1').value;
      const comment2 = document.getElementById('comment2').value;
      const comment3 = document.getElementById('comment3').value;
      const formData = new FormData();
      formData.append('image', imageInput.files[0]);
      formData.append('comment1', comment1);
      formData.append('comment2', comment2);
      formData.append('comment3', comment3);
      try {
        const res = await fetch('http://localhost:3000/api/profile', {
          method: 'POST',
          body: formData
        });
        const data = await res.json();
        if (res.ok) {
          profileMessage.textContent = '¡Perfil enviado exitosamente!';
          profileForm.reset();
        } else {
          profileMessage.textContent = data.message || 'Error al enviar perfil.';
        }
      } catch (err) {
        profileMessage.textContent = 'Error de conexión.';
      }
    });
  }
});
