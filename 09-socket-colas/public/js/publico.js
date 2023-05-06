const lblTicket1 = document.getElementById('lblTicket1')
const lblEscritorio1 = document.getElementById('lblEscritorio1')
const lblTicket2 = document.getElementById('lblTicket2')
const lblEscritorio2 = document.getElementById('lblEscritorio2')
const lblTicket3 = document.getElementById('lblTicket3')
const lblEscritorio3 = document.getElementById('lblEscritorio3')
const lblTicket4 = document.getElementById('lblTicket4')
const lblEscritorio4 = document.getElementById('lblEscritorio4')

const socket = io()

socket.on('estado-actual', (payload) => {
    const audio = new Audio('./audio/new-ticket.mp3')

    audio.play() // no funciona en chrome

    const [ticket1, ticket2, ticket3, ticket4] = payload

    if (ticket1) {
        lblTicket1.innerHTML = `Ticket ${ticket1.numero}`
        lblEscritorio1.innerHTML = ticket1.escritorio
    }

    if (ticket2) {
        lblTicket2.innerHTML = `Ticket ${ticket2.numero}`
        lblEscritorio2.innerHTML = ticket2.escritorio
    }

    if (ticket3) {
        lblTicket3.innerHTML = `Ticket ${ticket3.numero}`
        lblEscritorio3.innerHTML = ticket3.escritorio
    }

    if (ticket4) {
        lblTicket4.innerHTML = `Ticket ${ticket4.numero}`
        lblEscritorio4.innerHTML = ticket4.escritorio
    }
})