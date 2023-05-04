export const messagesController = (socketClient) => {
    console.log('Cliente conectado. ', socketClient.id)

    socketClient.on('disconnect', () => console.log('Cliente desconectado. ', socketClient.id))

    socketClient.on('send-message', (payload, callback) => { // el callback solo es para el cliente que emitio el evento
        // this.io.emit('send-message', payload) // si se emite a io, el evento es para todos los clientes

        const record = { _id: 123123, ...payload }

        callback(record)

        socketClient.emit('send-message', record.message) // solo para el cliente que emitio el mensaje
        socketClient.broadcast.emit('send-message', record.message) // para todos los clientes exepto al cliente que lo emitio
    })
}