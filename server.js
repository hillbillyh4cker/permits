import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3001;
const DB_PATH = path.join(__dirname, 'data', 'permits.json');
const DATA_DIR = path.join(__dirname, 'data');

// Handle large base64 payloads (Videos, PDFs)
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(cors());

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR);
}

// Ensure db file exists with initial data
if (!fs.existsSync(DB_PATH)) {
  console.log('Creating initial permits.json...');
  fs.writeFileSync(DB_PATH, JSON.stringify([], null, 2));
}

// Routes
app.get('/api/permits', (req, res) => {
  try {
    const data = JSON.parse(fs.readFileSync(DB_PATH, 'utf8'));
    res.json(data);
  } catch (err) {
    console.error('Error reading db.json:', err);
    res.status(500).json({ error: 'Failed to load permits' });
  }
});

app.post('/api/permits', (req, res) => {
  try {
    const permits = req.body;
    fs.writeFileSync(DB_PATH, JSON.stringify(permits, null, 2));
    res.json({ success: true });
  } catch (err) {
    console.error('Error writing to db.json:', err);
    res.status(500).json({ error: 'Failed to save permits' });
  }
});

// Single permit update helper (optional but useful)
app.put('/api/permits/:id', (req, res) => {
  try {
    const { id } = req.params;
    const updatedPermit = req.body;
    let data = JSON.parse(fs.readFileSync(DB_PATH, 'utf8'));
    data = data.map(p => p.id === id ? updatedPermit : p);
    fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
    res.json({ success: true });
  } catch {
    res.status(500).json({ error: 'Failed to update permit' });
  }
});

app.listen(PORT, () => {
  console.log(`\x1b[32m%s\x1b[0m`, `PermitPro Backend running at http://localhost:${PORT}`);
});
