const clientesCtrl = {}

const Clienta = require('../models/Clientas')
const Notificacion = require('../models/Notificaciones')

clientesCtrl.getClientes = async ( req, res ) => {
    const clientes = await Clienta.find().sort({ id: 'asc' })
    res.json(clientes)
}

clientesCtrl.newCliente = async ( req, res ) => {
    const { body } = req
    const cliente = await Clienta.findOne({ id : body.id})
    if(!cliente){
        const newCliente = new Clienta({
            id: body.id, 
            nombre: body.nombre, 
            correo: body.correo, 
            contraseña: body.contraseña, 
            telefono: body.telefono,
            cortes: body.cortes,
            puntos: body.puntos
        })
        await newCliente.save()
        res.json({ message: 200})
    }else{
        res.json({ message: 404})
    }
}


clientesCtrl.getOneCliente = async ( req, res) => {
    const cliente = await Clienta.findOne({ id: req.params.id })
    if(!cliente){
        res.json({ message: 404 })
    }
    res.json(cliente)
}

clientesCtrl.getOnePerfil = async ( req, res) => {
    const cliente = await Clienta.findOne({ _id: req.params.id })
    if(!cliente){
        res.json({ message: 404 })
    }
    res.json(cliente)
}

clientesCtrl.updateClienteAdmin = async ( req, res ) => {
    const { id, nombre, telefono, correo, cortes, puntos } = req.body
    await Clienta.findOneAndUpdate({ _id: req.params.id }, {
        id: id,
        nombre: nombre,
        correo: correo,
        telefono: telefono,
        cortes: cortes,
        puntos: puntos
    })
    res.json({ message: 200 })
}

clientesCtrl.sumarCorte = async ( req, res ) => {
    const { totalCortes } = req.body
    await Clienta.findOneAndUpdate({ id: req.params.id }, { cortes: totalCortes })
    res.json({ message: 200 })
}

clientesCtrl.sumarPuntos = async ( req, res ) => {
    
    const { puntos } = req.body
    await Clienta.findOneAndUpdate({ id: req.params.id }, { puntos })
    res.json({ message: 200 })
}

clientesCtrl.updateCliente = async ( req, res ) => {
    const { nombre, telefono, correo } = req.body
    await Clienta.findOneAndUpdate({ _id: req.params.id }, {
        nombre: nombre,
        correo: correo,
        telefono: telefono,
    })
    res.json({ message: 200 })
}

clientesCtrl.updateContraseña = async ( req, res ) => {
    const { contraseña } = req.body
    await Clienta.findOneAndUpdate({ _id: req.params.id }, { contraseña })
    res.json({ message: 200 })
}


clientesCtrl.deleteCliente = async ( req, res ) => {
    await Clienta.findOneAndDelete({ _id: req.params.id })
    res.json({ message: 200 })
}

clientesCtrl.login = async ( req, res) => {
    const cliente = await Clienta.findOne({ correo: req.body.correo, contraseña: req.body.contraseña  })
    if(!cliente){
        res.json({ message: 404 })
    }else{
        const noti = await Notificacion.findOneAndUpdate({ _id : req.body.notificacion }, {
            administrador : cliente._id
        })
        res.json(cliente)
    }
    
}


module.exports = clientesCtrl;