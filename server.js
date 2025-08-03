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

app.get('/:game/data', (req, res) => {
  const { game } = req.params;
  const db = readDB();
  res.json(db[game]);
});

app.post('/:game/participant', (req, res) => {
  const { game } = req.params;
  const db = readDB();
  const { name } = req.body;
  const newParticipant = { id: uuidv4(), name };
  db[game].participants.push(newParticipant);
  writeDB(db);
  res.status(201).json(db[game]);
});

app.post('/:game/score', (req, res) => {
  const { game } = req.params;
  const {
    participantAId,
    participantAScore,
    participantBId,
    participantBScore,
  } = req.body;
  const db = readDB();

  let winner = null;

  if (+participantAScore > +participantBScore) {
    winner = participantAId;
  } else if (+participantBScore > +participantAScore) {
    winner = participantBId;
  }

  db[game].matches.push({
    participantA: { id: participantAId, score: participantAScore },
    participantB: { id: participantBId, score: participantBScore },
    winner,
  });
  writeDB(db);
  res.status(200).json(db[game]);
});

app.delete('/:game', (req, res) => {
  const { game } = req.params;
  const db = readDB();
  db[game] = { participants: [], matches: [] };
  writeDB(db);
  res.status(200).json(db[game]);
});

app.listen(PORT, () => {
  console.log(`Express API running on http://localhost:${PORT}`);
});
