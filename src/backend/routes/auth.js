import express from 'express';
import bcrypt from 'bcryptjs';
import pool from '../config/db.js';
import tempUsers from '../models/tempUsers.js';

const router = express.Router();

// Simulación de almacenamiento de tokens de recuperación
const resetTokens = new Map();

// Registro temporal
router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) return res.status(400).json({ message: 'Todos los campos son obligatorios' });
  if (tempUsers.find(u => u.email === email)) return res.status(400).json({ message: 'El correo ya está registrado' });
  const hashedPassword = await bcrypt.hash(password, 10);
  tempUsers.push({
    id: tempUsers.length + 1,
    username,
    email,
    password: hashedPassword,
    created_at: new Date()
  });
  res.json({ message: 'Registro exitoso' });
});

// Login temporal
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  console.log('Login recibido:', { email, password });
  const user = tempUsers.find(u => u.email === email);
  if (!user) {
    console.log('Usuario no encontrado:', email);
    return res.status(400).json({ message: 'Usuario no encontrado' });
  }
  const valid = await bcrypt.compare(password, user.password);
  if (!valid) {
    console.log('Contraseña incorrecta para:', email);
    return res.status(400).json({ message: 'Contraseña incorrecta' });
  }
  console.log('Login exitoso para:', email);
  res.json({ message: 'Login exitoso', token: 'demo-token' });
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
