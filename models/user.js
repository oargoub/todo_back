const mongoose = require('mongoose')
const validator = require('validator')

var UserSchema = new mongoose.Schema({

    nom: {
        type: String,
        required: true,
        minlength: 2
    },
    prenom: {
        type: String,
        required: true,
        minlength: 2
    },
    telephone: {
        type: String,
        required: true,
        minlength: 2
    },
    email: {
        type: String,
        required: true,
        minlength: 2,
        unique: true,
        validate: {
            validator: validator.isEmail,
            message: 'email invalide'
        }
    },
    motDePasse: {
        type: String,
        required: true,
        minlength: 8
    },
    tokens: {
        access: {
            type: String,
        },
        token: {
            type: String,
        }
    }

})

var User = mongoose.model('User', UserSchema);

module.exports = { User }