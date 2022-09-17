const express = require('express');
const mongoose = require('mongoose')
const app = express();
const Thing = require('./model/thing');

// Connexion server MongoDB


app.use(express.json());

app.use('/api/stuff', (req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});


app.post('/api/stuff', (req, res, next) => {
  delete req.body._id;
  const thing = new Thing ({
    ...req.body
  });
  thing.save()
    .then(() => res.status(200).json({ message : "Thing enregistré !"}))
    .catch(error => res.status(400).json({ message : "Il y'a l'erreur ici" }));
});

app.put("/api/stuff/:id", (req, res, next) => {
  Thing.replaceOne({_id : req.params.id}, {...req.body, _id: req.params.id})
    .then(() => res.status(200).json({message : "Objet bien modifié ! "}))
    .catch(error => res.status(400).json({ error }));
});

app.delete("/api/stuff/:id", (req, res, next) => {
    Thing.deleteOne({ _id :  req.params.id})
      .then(() => res.status(200).json({ message : "Objet bien supprimé ! "}))
      .catch(error => res.status(400).json({ error }))
})


app.get("/api/stuff/:id", (req, res) => {
  Thing.findOne({_id: req.params.id})
    .then(thing => res.status(200).json(thing))
    .catch(error => res.status(404).json({ error }));
});


app.get('/api/stuff', (req, res, next) => {
  Thing.find()
    .then(things => res.status(200).json(things))
    .catch(error => res.status(400).json({ error }));
});


module.exports = app;