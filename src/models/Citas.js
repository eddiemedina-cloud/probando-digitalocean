const { Schema, model } = require('mongoose')

const Citas = new Schema({
    fecha: { type: String },
    hora: { type: String },
    estilista: { type: String },
    idcliente: { type: String },
    idcita: { type: String },
    cliente: { type: String },
    telefono: { type: Number },
    rowspan: { type: String },
    duracion: { type: String },
    servicio: { type: String },
    idservicio: { type: String},
    ocupado: { type: Boolean },
    confirmacion: { type: Boolean},
    historial: { type: Boolean},
    precio: { type: Number }

})

module.exports = model('Citas', Citas)