import express from 'express';
import fs from 'fs';
import path from 'path';
import cors from 'cors';
import { v4 as uuidv4 } from 'uuid';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const app = express();
const PORT = process.env.PORT || 3000;

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

app.get('/api/:game/data', (req, res) => {
  const { game } = req.params;
  const db = readDB();
  res.json(db[game]);
});

app.post('/api/:game/participant', (req, res) => {
  const { game } = req.params;
  const db = readDB();
  const { name } = req.body;
  const newParticipant = { id: uuidv4(), name };
  db[game].participants.push(newParticipant);
  writeDB(db);
  res.status(201).json(db[game]);
});

app.post('/api/:game/score', (req, res) => {
  const { game } = req.params;
  const {
    participantAId,
    participantAScore,
    participantBId,
    participantBScore,
  } = req.body;
  const db = readDB();

  const foundParticipantA = db[game].participants.find(
    (e) => e.id === participantAId
  );
  const foundParticipantB = db[game].participants.find(
    (e) => e.id === participantBId
  );

  let winner = null;

  if (+participantAScore > +participantBScore) {
    winner = participantAId;
  } else if (+participantBScore > +participantAScore) {
    winner = participantBId;
  }

  db[game].matches.push({
    participantA: { ...foundParticipantA, score: participantAScore },
    participantB: { ...foundParticipantB, score: participantBScore },
    winner,
  });
  writeDB(db);
  res.status(200).json(db[game]);
});

app.delete('/api/:game', (req, res) => {
  const { game } = req.params;
  const db = readDB();
  db[game] = { participants: [], matches: [] };
  writeDB(db);
  res.status(200).json(db[game]);
});

app.use(express.static(path.join(__dirname, 'dist')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Express API running on http://localhost:${PORT}`);
});
