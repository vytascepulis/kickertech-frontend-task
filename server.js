import express from 'express';
import fs from 'fs';
import path from 'path';
import cors from 'cors';
import { v4 as uuidv4 } from 'uuid';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const app = express();
const PORT = 3001;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const DB_PATH = path.join(__dirname, 'db.json');

app.use(cors());
app.use(express.json());

function readDB() {
  return JSON.parse(fs.readFileSync(DB_PATH, 'utf-8'));
}

function writeDB(data) {
  fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
}

app.get('/entities', (req, res) => {
  const db = readDB();
  res.json(db);
});

app.post('/entities', (req, res) => {
  const db = readDB();
  const { game, name } = req.body;
  const newEntity = { id: uuidv4(), name, matchesHistory: [] };
  db[game].push(newEntity);
  writeDB(db);
  res.status(201).json(db[game]);
});

app.put('/score', (req, res) => {
  const { homeEntityId, homeEntityScore, awayEntityId, awayEntityScore, game } =
    req.body;
  const db = readDB();

  const getResultByScore = (first, second) => {
    if (first > second) return 'WIN';
    if (first < second) return 'LOSE';
    return 'DRAW';
  };

  const foundHomeEntity = db[game].find((e) => e.id === homeEntityId);
  const foundAwayEntity = db[game].find((e) => e.id === awayEntityId);
  const filteredEntities = db[game].filter(
    (e) => e.id !== homeEntityId && e.id !== awayEntityId
  );

  const updatedHome = {
    ...foundHomeEntity,
    matchesHistory: [
      ...foundHomeEntity.matchesHistory,
      {
        result: getResultByScore(homeEntityScore, awayEntityScore),
        playedVersus: awayEntityId,
      },
    ],
  };

  const updatedAway = {
    ...foundAwayEntity,
    matchesHistory: [
      ...foundAwayEntity.matchesHistory,
      {
        result: getResultByScore(awayEntityScore, homeEntityScore),
        playedVersus: homeEntityId,
      },
    ],
  };

  db[game] = [...filteredEntities, updatedHome, updatedAway];
  writeDB(db);
  res.status(200).json(db[game]);
});

app.delete('/entities/:game', (req, res) => {
  const { game } = req.params;
  const db = readDB();
  db[game] = [];
  writeDB(db);
  res.status(200).json(db[game]);
});

app.listen(PORT, () => {
  console.log(`Express API running on http://localhost:${PORT}`);
});
