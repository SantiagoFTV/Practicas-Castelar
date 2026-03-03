function limpiarCampos() {
  document.getElementById('profile-form').reset();
  document.getElementById('profile-message').textContent = '';
  document.getElementById('preview-container').style.display = 'none';
}

// Variables globales para la previsualización
let currentImageFile = null;
let isPixelated = false;

// Event listener para el input de archivo
document.getElementById('profile-image').addEventListener('change', function(e) {
  currentImageFile = e.target.files[0];
  if (currentImageFile) {
    previewImage();
  } else {
    document.getElementById('preview-container').style.display = 'none';
  }
});

// Event listener para el checkbox de pixelado
document.getElementById('pixelate-image').addEventListener('change', function() {
  isPixelated = this.checked;
  if (currentImageFile) {
    previewImage();
  }
});

// Función para mostrar la previsualización
function previewImage() {
  const reader = new FileReader();
  reader.onload = function(e) {
    const img = new Image();
    img.onload = function() {
      const canvas = document.getElementById('preview-canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0);
      
      if (isPixelated) {
        pixelateCanvas(canvas, 10); // 10 es el tamaño del bloque pixel
      }
      
      document.getElementById('preview-container').style.display = 'block';
    };
    img.src = e.target.result;
  };
  reader.readAsDataURL(currentImageFile);
}

// Función para aplicar efecto pixelado
function pixelateCanvas(canvas, pixelSize) {
  const ctx = canvas.getContext('2d');
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const data = imageData.data;

  for (let i = 0; i < canvas.height; i += pixelSize) {
    for (let j = 0; j < canvas.width; j += pixelSize) {
      const pixelIndex = (Math.floor(i) * canvas.width + Math.floor(j)) * 4;
      
      const r = data[pixelIndex];
      const g = data[pixelIndex + 1];
      const b = data[pixelIndex + 2];
      const a = data[pixelIndex + 3];
      
      for (let y = i; y < i + pixelSize && y < canvas.height; y++) {
        for (let x = j; x < j + pixelSize && x < canvas.width; x++) {
          const index = (Math.floor(y) * canvas.width + Math.floor(x)) * 4;
          data[index] = r;
          data[index + 1] = g;
          data[index + 2] = b;
          data[index + 3] = a;
        }
      }
    }
  }
  
  ctx.putImageData(imageData, 0, 0);
}
