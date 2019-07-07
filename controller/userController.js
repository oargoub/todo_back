const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt')


var { User } = require('../models/user');
var { mongoose } = require('../db/config');

var router = express.Router();

router.use(bodyParser.json());

router.get("/", (req, res) => {
    res.send("Hello from user controller");
});

router.post("/inscription", (req, res) => {
    //1 - récupération des données
    let data = req.body;

    //1.1 Cryptage mot de passe
    var salt = bcrypt.genSaltSync(10);
    var mdpCrypte = bcrypt.hashSync(data.motDePasse, salt);

    //2 -Création d'un objet du model user

    var user = new User({
        nom: data.nom,
        prenom: data.prenom,
        email: data.email,
        telephone: data.telephone,
        motDePasse: mdpCrypte
    });
    
    //3 -Isertion des données
    user.save().then(() => {
       
        //4 -Envoi des données vers le FE
        res.status(200).send({ message: 'Utilisateur inscri avec succees' });
        
    }).catch((e) => {
        //4 -Envoi des données vers le FE
        res.status(400).send({ message: 'Erreur Insertion : '+e });
    });

    
});

router.post("/connexion", (req, res) => {
    //1 - récupération des données
    let data = req.body;

    //2 -Création d'un objet du model user
    //3 -Isertion des données
    //4 -Envoi des données vers le FE
    res.send(data);

});
router.get("/profil", (req, res) => {
    //1 - récupération des données
    let data = req.body;

    //2 -Création d'un objet du model user
    //3 -Isertion des données
    //4 -Envoi des données vers le FE
    res.send(data);

});
module.exports = router;