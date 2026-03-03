// Script para subir imagen y comentarios positivos

document.addEventListener('DOMContentLoaded', () => {
  const profileForm = document.getElementById('profile-form');
  const profileMessage = document.getElementById('profile-message');
  const profilesList = document.getElementById('profiles-list');

  const token = localStorage.getItem('token');

  if (!token) {
    window.location.href = 'login.html';
    return;
  }

  const renderProfiles = (profiles) => {
    if (!profilesList) return;

    if (!profiles.length) {
      profilesList.innerHTML = '<p class="text-muted">Aún no hay perfiles guardados.</p>';
      return;
    }

    profilesList.innerHTML = profiles.map((profile) => `
      <div class="col-12 col-md-6">
        <div class="card h-100">
          <img src="${profile.image_path}" class="card-img-top conflict-image ${profile.is_pixelated ? 'pixelated' : ''}" alt="Perfil en conflicto">
          <div class="card-body">
            <h4 class="h6">Comentarios positivos</h4>
            <ul class="mb-0">
              <li>${profile.comment1}</li>
              <li>${profile.comment2}</li>
              <li>${profile.comment3}</li>
            </ul>
          </div>
        </div>
      </div>
    `).join('');
  };

  const loadProfiles = async () => {
    try {
      const response = await fetch('/api/profile/mine', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('No se pudo cargar perfiles');
      }

      const profiles = await response.json();
      renderProfiles(profiles);
    } catch (error) {
      if (profilesList) {
        profilesList.innerHTML = '<p class="text-danger">Error cargando perfiles.</p>';
      }
    }
  };

  if (profileForm) {
    profileForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const imageInput = document.getElementById('profile-image');
      const pixelate = document.getElementById('pixelate-image').checked;
      const comment1 = document.getElementById('comment1').value;
      const comment2 = document.getElementById('comment2').value;
      const comment3 = document.getElementById('comment3').value;
      const formData = new FormData();
      formData.append('image', imageInput.files[0]);
      formData.append('comment1', comment1);
      formData.append('comment2', comment2);
      formData.append('comment3', comment3);
      formData.append('pixelate', String(pixelate));
      try {
        const res = await fetch('/api/profile', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`
          },
          body: formData
        });
        const data = await res.json();
        if (res.ok) {
          profileMessage.textContent = '¡Perfil enviado exitosamente!';
          profileForm.reset();
          await loadProfiles();
        } else {
          profileMessage.textContent = data.message || 'Error al enviar perfil.';
        }
      } catch (err) {
        profileMessage.textContent = 'Error de conexión.';
      }
    });
  }

  loadProfiles();
});
