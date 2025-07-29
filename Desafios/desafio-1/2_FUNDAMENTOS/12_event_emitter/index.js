const EventEmitter = require('events')      // Criando a Classe
const eventEmitter = new EventEmitter()     // Instanciando a classe

eventEmitter.on('start', () => {
    console.log("Durante")
})

console.log("Antes")

eventEmitter.emit('start')

console.log("Depois")
