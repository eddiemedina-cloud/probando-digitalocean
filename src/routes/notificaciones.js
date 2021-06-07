const { Router } = require('express')
const router = Router()
const webpush = require('../webpush')
const Notificaciones = require('../models/Notificaciones')
const Administrador = require('../models/Administradores')
const Citas = require('../models/Citas')

router.post('/subscription', async (req, res) => {
    
    const subscripcion = req.body.register

    const admin = req.body.admin

    if(admin){
        const subs = await Notificaciones.findOne({ administrador : admin })
        const administrador = await Administrador.findOne({ _id: admin })
        const playload = JSON.stringify({
            title: `Bienvenido ${administrador.nombre}`,        
        })
        
        try {
            await webpush.sendNotification(subs.subscripcion, playload)
        } catch (error) {
            console.log(error)
        }
    }else{
        const newSubscripcion = new Notificaciones({
            subscripcion
        })
    
        const save = await newSubscripcion.save()
    
        res.json(save._id)
    
        const playload = JSON.stringify({
            title: 'Bienvenido',        
        })
        
        try {
            await webpush.sendNotification(subscripcion, playload)
        } catch (error) {
            console.log(error)
        }
    }
    
})

//rutas

router.post('/confirm', async ( req, res ) => {

    const cita = await Citas.findOneAndUpdate({ _id: req.body.id }, {
        confirmacion : true
    })
    if(cita.idcliente){
        const subs = await Notificaciones.findOne({ administrador : cita.idcliente })
        const playload = JSON.stringify({
            title: `Tu cita ha sido confirmada`,        
        })
        
        try {
            await webpush.sendNotification(subs.subscripcion, playload)
        } catch (error) {
            console.log(error)
        }
        res.json({ message : 200})  
    }else{
        res.json({ message : 200})  
    }
})
module.exports = router
