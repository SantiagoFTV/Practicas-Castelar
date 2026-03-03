import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import pool from '../config/db.js';

const router = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const uploadsDir = path.join(__dirname, '../uploads');

if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadsDir),
  filename: (req, file, cb) => {
    const extension = path.extname(file.originalname || '.jpg');
    cb(null, `${Date.now()}-${Math.round(Math.random() * 1e9)}${extension}`);
  }
});

const upload = multer({ storage });

function getEmailFromToken(req) {
  const authHeader = req.headers.authorization || '';
  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : '';

  if (!token.startsWith('demo-token-')) return null;

  try {
    const encoded = token.slice('demo-token-'.length);
    return Buffer.from(encoded, 'base64').toString('utf8');
  } catch (error) {
    return null;
  }
}

async function ensureProfilesTable() {
  await pool.execute(`
    CREATE TABLE IF NOT EXISTS conflict_profiles (
      id INT AUTO_INCREMENT PRIMARY KEY,
      user_email VARCHAR(100) NOT NULL,
      image_path VARCHAR(255) NOT NULL,
      comment1 VARCHAR(255) NOT NULL,
      comment2 VARCHAR(255) NOT NULL,
      comment3 VARCHAR(255) NOT NULL,
      is_pixelated TINYINT(1) DEFAULT 0,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);
}

router.post('/', upload.single('image'), async (req, res) => {
  const userEmail = getEmailFromToken(req);

  if (!userEmail) {
    return res.status(401).json({ message: 'No autorizado' });
  }

  const { comment1, comment2, comment3, pixelate } = req.body;

  if (!req.file || !comment1 || !comment2 || !comment3) {
    return res.status(400).json({ message: 'Imagen y comentarios son obligatorios' });
  }

  try {
    await ensureProfilesTable();

    const imagePath = `/api/profile/image/${req.file.filename}`;
    const isPixelated = pixelate === 'true' ? 1 : 0;

    await pool.execute(
      `INSERT INTO conflict_profiles (user_email, image_path, comment1, comment2, comment3, is_pixelated)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [userEmail, imagePath, comment1, comment2, comment3, isPixelated]
    );

    return res.json({ message: 'Perfil guardado exitosamente' });
  } catch (error) {
    return res.status(500).json({ message: 'Error al guardar el perfil' });
  }
});

router.get('/mine', async (req, res) => {
  const userEmail = getEmailFromToken(req);

  if (!userEmail) {
    return res.status(401).json({ message: 'No autorizado' });
  }

  try {
    await ensureProfilesTable();

    const [rows] = await pool.execute(
      `SELECT id, image_path, comment1, comment2, comment3, is_pixelated, created_at
       FROM conflict_profiles
       WHERE user_email = ?
       ORDER BY created_at DESC`,
      [userEmail]
    );

    return res.json(rows);
  } catch (error) {
    return res.status(500).json({ message: 'Error al obtener perfiles' });
  }
});

router.get('/image/:filename', (req, res) => {
  const filePath = path.join(uploadsDir, req.params.filename);

  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ message: 'Imagen no encontrada' });
  }

  return res.sendFile(filePath);
});

export default router;
