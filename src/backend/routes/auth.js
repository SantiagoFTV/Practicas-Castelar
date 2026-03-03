import express from 'express';
import bcrypt from 'bcryptjs';
import pool from '../config/db.js';

const router = express.Router();

// Simulación de almacenamiento de tokens de recuperación
const resetTokens = new Map();

// Registro de usuario en MySQL
router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return res.status(400).json({ message: 'Todos los campos son obligatorios' });
  }

  try {
    const [existingUsers] = await pool.execute('SELECT id FROM users WHERE email = ? OR username = ?', [email, username]);

    if (existingUsers.length > 0) {
      return res.status(400).json({ message: 'El correo o usuario ya está registrado' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await pool.execute(
      'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
      [username, email, hashedPassword]
    );

    return res.json({ message: 'Registro exitoso' });
  } catch (error) {
    return res.status(500).json({ message: 'Error en el registro' });
  }
});

// Inicio de sesión contra MySQL
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: 'Correo y contraseña son obligatorios' });
  }

  try {
    const [rows] = await pool.execute('SELECT * FROM users WHERE email = ?', [email]);
    const user = rows[0];

    if (!user) {
      return res.status(400).json({ message: 'Usuario no encontrado' });
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      return res.status(400).json({ message: 'Contraseña incorrecta' });
    }

    const token = `demo-token-${Buffer.from(email).toString('base64')}`;
    return res.json({ message: 'Login exitoso', token });
  } catch (error) {
    return res.status(500).json({ message: 'Error en el inicio de sesión' });
  }
});

// Solicitar enlace de recuperación
router.post('/forgot', async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ message: 'El correo es obligatorio' });
  // Buscar usuario
  const [rows] = await pool.execute('SELECT * FROM users WHERE email = ?', [email]);
  if (!rows[0]) return res.json({ message: 'Si el correo está registrado, recibirás un enlace.' });
  // Generar token simple
  const token = Math.random().toString(36).slice(2);
  resetTokens.set(token, email);
  // Simular envío de email
  res.json({ message: 'Enlace enviado', resetLink: `/api/auth/reset/${token}` });
});

// Validar token y mostrar email
router.get('/reset/:token', (req, res) => {
  const { token } = req.params;
  const email = resetTokens.get(token);
  if (!email) return res.status(400).json({ message: 'Token inválido' });
  res.json({ email });
});

// Cambiar contraseña usando token
router.post('/reset/:token', async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;
  const email = resetTokens.get(token);
  if (!email) return res.status(400).json({ message: 'Token inválido' });
  if (!password) return res.status(400).json({ message: 'La nueva contraseña es obligatoria' });
  const hashedPassword = await bcrypt.hash(password, 10);
  await pool.execute('UPDATE users SET password = ? WHERE email = ?', [hashedPassword, email]);
  resetTokens.delete(token);
  res.json({ message: 'Contraseña actualizada' });
});

export default router;
