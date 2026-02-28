// Backend principal para Sprint 1
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();


import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json());

// Servir archivos estáticos del frontend
app.use(express.static(path.join(__dirname, '../frontend')));


// Redirigir / a login.html del frontend
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/html/login.html'));
});

// Rutas
import authRoutes from './routes/auth.js';
app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor backend escuchando en puerto ${PORT}`);
  console.log(`Accede a: http://localhost:${PORT}/html/login.html`);
});
