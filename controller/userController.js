const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


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
        res.status(400).send({ message: 'Erreur Insertion ' });
    });


});

router.post("/connexion", (req, res) => {
    //1 - récupération des données
    let data = req.body;

    let email = data.email;
    let password = data.motDePasse;
    
    //3 - rechecrhe des données DB
    User.findOne({ email }).then((user) => {
        if (!user) {
            res.status(404).send({ message: 'Email incorrecte' });
        }
        
        
        let passTrue = bcrypt.compareSync(password, user.motDePasse);

        if (!passTrue) {
            res.status(404).send({ message: 'Mot de passe incorrecte' });
        }

        var token = jwt.sign({ idUser: user._id }, 'cle');


        res.status(200).send({ 
            token, 
            message:'connexion success'
        });


    }).catch(
        (e) => {
            //4 -Envoi des données vers le FE
            res.status(400).send({ message: 'Erreur Fetch '+e });
        }
    );
    //4 -Envoi des données vers le FE


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