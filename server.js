import express from 'express';
import handler from './api/users.js';

const app = express();
app.use(express.json());

// Usa la misma función que en tu archivo de Vercel
app.get('/api/users', handler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
