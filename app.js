const express = require('express');
const mongoose = require('mongoose')
const app = express();
const routeStuff = require("./routes/stuff")

// Connexion server MongoDB
mongoose.connect('mongodb+srv://Lucciii:Mm0634484228@cluster0.5cnh06p.mongodb.net/?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

app.use(express.json()); 

app.use('/api/stuff', (req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use("/api/stuff", routeStuff)

module.exports = app;