const express = require('express');
const app = express();

app.use(express.json());

const joueurs = require('./joueurs.json');
const equipes = require('./equipes.json');

// CRUD operations for the "joueur" entity

// Create a new player
app.post('/joueurs', (req, res) => {
    const newJoueur = req.body;
    joueurs.push(newJoueur);
    res.status(201).json(joueurs);
});

// Read all players
app.get('/joueurs', (req, res) => {
    res.status(200).json(joueurs);
});

// Read a player by ID
app.get('/joueurs/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const joueur = joueurs.find(joueur => joueur.id === id);
    if (!joueur) {
        res.status(404).send('Joueur not found.');
    } else {
        res.status(200).json(joueur);
    }
});

// Update a player by ID
app.put('/joueurs/:id', (req, res) => {
    const id = parseInt(req.params.id);
    let joueur = joueurs.find(joueur => joueur.id === id);
    if (!joueur) {
        res.status(404).send('Joueur not found.');
    } else {
        joueur.nom = req.body.nom || joueur.nom;
        joueur.numero = req.body.numero || joueur.numero;
        joueur.poste = req.body.poste || joueur.poste;
        res.status(200).json(joueur);
    }
});

// Delete a player by ID
app.delete('/joueurs/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = joueurs.findIndex(joueur => joueur.id === id);
    if (index === -1) {
        res.status(404).send('Joueur not found.');
    } else {
        joueurs.splice(index, 1);
        res.status(200).json(joueurs);
    }
});

// Route to display players of a team by team ID
app.get('/equipes/:id/joueurs', (req, res) => {
    const equipeId = parseInt(req.params.id);
    const equipe = equipes.find(equipe => equipe.id === equipeId);
    if (!equipe) {
        res.status(404).send('Équipe not found.');
    } else {
        const equipeJoueurs = joueurs.filter(joueur => joueur.idEquipe === equipeId);
        res.status(200).json(equipeJoueurs);
    }
});

// Route to display the team of a given player by player ID
app.get('/joueurs/:id/equipe', (req, res) => {
    const playerId = parseInt(req.params.id);
    const joueur = joueurs.find(joueur => joueur.id === playerId);
    if (!joueur) {
        res.status(404).send('Joueur not found.');
    } else {
        const equipe = equipes.find(equipe => equipe.id === joueur.idEquipe);
        res.status(200).json(equipe);
    }
});

// Route to search for a player by name
app.get('/joueurs/search/:name', (req, res) => {
    const playerName = req.params.name.toLowerCase();
    const foundPlayers = joueurs.filter(joueur => joueur.nom.toLowerCase().includes(playerName));
    res.status(200).json(foundPlayers);
});

app.listen(82, () => {
    console.log('REST API via ExpressJS');
});
