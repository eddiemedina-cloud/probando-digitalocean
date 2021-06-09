const { Schema, model } = require('mongoose')

const Servicio = new Schema({
    servicio: { type : String},
    duracion: { type: Number },
    rango: { type: String },
    precio: { type: Number }
})

module.exports = model('Servicio', Servicio)