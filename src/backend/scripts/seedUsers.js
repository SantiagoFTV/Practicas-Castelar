import bcrypt from 'bcryptjs';
import pool from '../config/db.js';

async function seedUsers() {
  const demoHash = await bcrypt.hash('demo123', 10);
  const pruebaHash = await bcrypt.hash('prueba123', 10);

  await pool.execute(
    `INSERT INTO users (username, email, password)
     VALUES ('demo', 'demo@demo.com', ?), ('prueba', 'prueba@correo.com', ?)
     ON DUPLICATE KEY UPDATE
       username = VALUES(username),
       password = VALUES(password)`,
    [demoHash, pruebaHash]
  );

  console.log('Usuarios semilla creados/actualizados.');
}

seedUsers()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error('Error al sembrar usuarios:', error.message);
    process.exit(1);
  });
