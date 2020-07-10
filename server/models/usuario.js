const mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

//clase
let Schema = mongoose.Schema; //esquema dentro de mi base de datos (objeto)

//ROLES VALIDOS
let ImpresorasValidas = {
        values: ['XEROX', 'LEXMARK', 'RICOH', 'EPSON', 'SAMSUNG', 'KYOCERA', 'SHARP', 'COPYSTAR'],
        message: '{VALUE} no es un nombre de impresora válido'
    }
    //objeto
let usuarioShema = new Schema({
    marca: {
        type: String,
        required: [true, 'La marca de la impresora es requerido'],
        enum: ImpresorasValidas
    },
    modelo: {
        type: String,
        required: [true, 'El modelo de la impresora es requerido']
    },
    serie: {
        type: Number,
        required: [true, 'La serie es requerido'],
        unique: true
    },
    color: {
        type: Boolean,
        default: false
    },
    ip: {
        type: String,
        required: [true, 'La IP de la impresora es requerido'],
        unique: true
    },
    /*
    role: {
        type: String,
        default: 'USER_ROLE',
        enum: rolesValidos
    },*/
    contador: {
        type: Number,
        default: 0
    },
    precio: {
        type: Number,
        required: [true, 'El precio de la impresora es requerido']
    }
});

//error mas lindo
usuarioShema.plugin(uniqueValidator, { message: '{PATH} deber ser único' }); //para que el correo sea único

usuarioShema.methods.toJSON = function() {
    let user = this;
    let userObject = user.toObject();
    delete userObject.password;
    return userObject;
}

module.exports = mongoose.model('impresora', usuarioShema)