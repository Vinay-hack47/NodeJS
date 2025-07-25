import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import connectDB from './db/connectDB.js';
import uploadRoutes from './routes/uploadRoutes.js';

const app = express();
const PORT = 3000;


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', uploadRoutes);

app.use((err, req, res, next) => {
  console.error('Error:', err.message);
  res.status(500).json({ error: err.message || 'Server Error' });
});

connectDB();

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
