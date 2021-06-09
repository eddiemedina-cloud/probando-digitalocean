const servicioCtrl = {}

const Servicio = require('../models/Servicios')


servicioCtrl.getServicios = async ( req, res ) => {
    const servicios = await Servicio.find()
    res.json(servicios)
}

servicioCtrl.getOneServicio = async (req, res) => {
    const servicio = await Servicio.findOne({ _id : req.params.id })
    res.json(servicio)
}

servicioCtrl.createServicio = async ( req, res)  => {
    console.log(req.body)
    const { servicio, duracion, rango, precio } = req.body
    const newServicio = new Servicio({
        servicio, duracion, rango, precio
    })
    await newServicio.save()
    res.json({ message: 200 })
}

servicioCtrl.updateServicio = async ( req, res ) => {
    const { servicio, duracion, rango, precio } = req.body
    await Servicio.findOneAndUpdate({ _id : req.params.id} , {
        servicio, duracion, rango, precio
    })
    res.json({ message: 200 })
} 

servicioCtrl.deleteServicio = async ( req, res ) => {
    await Servicio.findOneAndDelete({ _id: req.params.id})
    res.json({message: 200})
}

module.exports = servicioCtrl