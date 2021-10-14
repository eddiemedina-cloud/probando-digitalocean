'use strict'
require('dotenv').config()

const { Server } = require("socket.io");
const express = require('express')
const port = (process.env.PORT || 4000)
const cors = require('cors')

const Citas = require('./models/Citas')

//inicializacion
const app = express()
const http = require('http').Server(app)
const { Client } = require('whatsapp-web.js');
const client = new Client();

client.on('qr', (qr) => {    console.log('QR RECEIVED', qr);});

client.on('ready', () => {    console.log('Client is ready!');});

client.initialize();

const io = new Server(http, { 
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
        credentials: true
      }    
});



require('./config/database')

//middlewares
app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

//routes
app.use('/api/v1/administrador', require('./routes/administrador'))
app.use('/api/v1/clientes', require('./routes/clientes'))
app.use('/api/v1/clientas', require('./routes/clientas'))
app.use('/api/v1/citas', require('./routes/citas'))
app.use('/api/v1/canjeables', require('./routes/canjeables'))
app.use('/api/v1/descuentos', require('./routes/descuentos'))
app.use('/api/v1/servicios', require('./routes/servicios'))
app.use('/api/v1/notificaciones', require('./routes/notificaciones'))



//servidor
http.listen(port, (err) => {
    if(err){
        console.log(`Error de conexion: ${err}`)
    }else{
        console.log(`Servidor conectado en puerto: ${port}`)
    }
} )






  



