const { Schema, model } = require('mongoose')

const Clienta = new Schema({
    nombre: { type: String },
    correo: { type: String },
    contraseña: { type: String },
    id: { type: Number },
    telefono: { type: Number },
    cortes: { type: Number },
    puntos: { type: Number }
})

module.exports = model('Clienta', Clienta)