const fs = require('fs')
const morgan = require('morgan')
const path = require('path')
const rfs = require('rotating-file-stream')

const logDirectory = path.join(__dirname, '..', 'log')

// s'assure que le répertoire des logs existes
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory)

// créer un log hebdomadaire
const accessLogStream = rfs('tgarcia.ch-access.log', {
    interval: '1d', // tous les jours
    path: logDirectory
})

// créer un log hebdomadaire
const errorLogStream = rfs('tgarcia.ch-error.log', {
    interval: '1d', // tous les jours
    path: logDirectory
})

process.on('uncaughtException', (err) => {
    errorLogStream.write(`${new Date().toISOString()} - Caught exception: ${err}\n`)
})  

module.exports.errorLogger = morgan('combined', { 
    skip: function (res, req) {
        return res.statusCode < 400
    },
    stream: errorLogStream
 })

module.exports.accessLogger = morgan('combined', { stream: accessLogStream })