const path = require('path')
const express = require('express')
const request = require('request')
const errorLogger = require('./logging').errorLogger
const accessLogger = require('./logging').accessLogger

const server = express()
const serverPort = 8080
const serverAddress = '0.0.0.0'

server.use(errorLogger)
server.use(accessLogger)

server.set('views', path.join(__dirname, '/views'))
server.set('view engine', 'pug')

server.use(express.static(path.join(__dirname, '..', '/dist')))

server.get('/', function (req, res) {
    res.render('index')
})  

server.get('/heatmap', function (req, res) {
    request(
        'https://framagit.org/users/HiTechRabbit/calendar.json', 
        function(err, reqResponse) {
            if (err) {
                res.status(500)
            }
            res.send(JSON.parse(reqResponse.body))
        }
    )
})

server.use(function(req, res) {
    res.status(400)
    res.render('error', {title: 'Fichier non trouvé', errorCode: 404})
})

server.use(function(err, req, res, next) {
    res.status(500)
    res.render('error', {title:'Erreur serveur interne', errorCode: 500})
})

server.listen(serverPort, serverAddress)