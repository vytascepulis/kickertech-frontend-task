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

app.get('/premierLeagueTeams', (req, res) => {
  const db = readDB();
  res.json(db.premierLeagueTeams);
});

app.post('/premierLeagueTeams', (req, res) => {
  const db = readDB();
  const newTeam = { id: uuidv4(), ...req.body };
  db.premierLeagueTeams.push(newTeam);
  writeDB(db);
  res.status(201).json(db.premierLeagueTeams);
});

app.put('/premierLeagueTeams', (req, res) => {
  const { homeTeamId, homeTeamScore, awayTeamId, awayTeamScore } = req.body;
  const db = readDB();

  const getResultByScore = (first, second) => {
    if (first > second) return 'WIN';
    if (first < second) return 'LOSE';
    return 'DRAW';
  };

  const foundHomeTeam = db.premierLeagueTeams.find(
    (team) => team.id === homeTeamId
  );
  const foundAwayTeam = db.premierLeagueTeams.find(
    (team) => team.id === awayTeamId
  );
  const filteredTeams = db.premierLeagueTeams.filter(
    (team) => team.id !== homeTeamId && team.id !== awayTeamId
  );

  const updatedHome = {
    ...foundHomeTeam,
    matchesHistory: [
      ...foundHomeTeam.matchesHistory,
      {
        result: getResultByScore(homeTeamScore, awayTeamScore),
        playedVersus: awayTeamId,
      },
    ],
  };

  const updatedAway = {
    ...foundAwayTeam,
    matchesHistory: [
      ...foundAwayTeam.matchesHistory,
      {
        result: getResultByScore(awayTeamScore, homeTeamScore),
        playedVersus: homeTeamId,
      },
    ],
  };

  db.premierLeagueTeams = [...filteredTeams, updatedHome, updatedAway];
  writeDB(db);
  res.status(200).json(db.premierLeagueTeams);
});

app.delete('/premierLeagueTeams', (req, res) => {
  const db = readDB();
  db.premierLeagueTeams = [];
  writeDB(db);
  res.status(200).json(db.premierLeagueTeams);
});

app.listen(PORT, () => {
  console.log(`Express API running on http://localhost:${PORT}`);
});
