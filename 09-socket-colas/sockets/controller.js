const { TicketControl } = require('../models/TicketControl')

const ticketControl = new TicketControl()

const socketController = (socket) => {
    socket.emit('ultimo-ticket', ticketControl.ultimo)
    socket.emit('estado-actual', ticketControl.ultimos4)
    socket.emit('tickets-pendientes', ticketControl.tickets.length)

    socket.on('siguiente-ticket', (payload, callback) => {
        const siguiente = ticketControl.siguiente()

        callback(siguiente)

        socket.emit('tickets-pendientes', ticketControl.tickets.length)
        socket.broadcast.emit('tickets-pendientes', ticketControl.tickets.length)
    })

    socket.on('atender-ticket', ({ escritorio }, callback) => {
        if (!escritorio) return callback({ ok: false, msg: 'El escritorio es obligatorio' })

        const ticket = ticketControl.atenderTicket(escritorio)

        socket.broadcast.emit('estado-actual', ticketControl.ultimos4)

        if (!ticket) return callback({ ok: false, msg: 'Sin tickets pendientes' })

        callback({ ok: true, ticket })

        socket.emit('tickets-pendientes', ticketControl.tickets.length)
        socket.broadcast.emit('tickets-pendientes', ticketControl.tickets.length)
    })
}

module.exports = {
    socketController
}