const express = require("express");
const routeur = express.Router();
const Thing = require('../model/thing');

routeur.post('/', (req, res, next) => {
  delete req.body._id;
  const thing = new Thing ({
    ...req.body
  });
  thing.save()
    .then(() => res.status(200).json({ message : "Thing enregistré !"}))
    .catch(error => res.status(400).json({ message : "Il y'a l'erreur ici" }));
});

routeur.put("/:id", (req, res, next) => {
  Thing.replaceOne({_id : req.params.id}, {...req.body, _id: req.params.id})
    .then(() => res.status(200).json({message : "Objet bien modifié ! "}))
    .catch(error => res.status(400).json({ error }));
});

routeur.delete("/:id", (req, res, next) => {
    Thing.deleteOne({ _id :  req.params.id})
      .then(() => res.status(200).json({ message : "Objet bien supprimé ! "}))
      .catch(error => res.status(400).json({ error }))
})


routeur.get("/:id", (req, res) => {
  Thing.findOne({_id: req.params.id})
    .then(thing => res.status(200).json(thing))
    .catch(error => res.status(404).json({ error }));
});


routeur.get('/api/stuff', (req, res, next) => {
    Thing.find()
        .then(things => res.status(200).json(things))
        .catch(error => res.status(400).json({ error }));
});

module.exports = routeur;