const searchParams = new URLSearchParams(window.location.search)

if (!searchParams.has('escritorio')) {
    window.location = 'index.html'

    throw new Error('El escritorio es obligatorio')
}

const escritorio = searchParams.get('escritorio')

const lblEscritorio = document.getElementById('lblEscritorio')
const btnAtender = document.getElementById('btnAtender')
const lblTicket = document.getElementById('lblTicket')
const divAlert = document.getElementById('divAlert')
const lblPendientes = document.getElementById('lblPendientes')

lblEscritorio.innerHTML = escritorio
divAlert.style.display = 'none'

const socket = io()

socket.on('connect', () => {
    btnAtender.disabled = false
})

socket.on('disconnect', () => {
    btnAtender.disabled = true
})

socket.on('tickets-pendientes', (payload) => {
    lblPendientes.innerHTML = payload

    if (payload !== 0) divAlert.style.display = 'none'
})

btnAtender.addEventListener('click', () => {
    socket.emit('atender-ticket', { escritorio }, ({ ok, ticket, msg }) => {
        if (!ok) {
            lblTicket.innerHTML = 'Nadie'
            divAlert.style.display = ''

            return
        }

        lblTicket.innerHTML = `Ticket ${ticket.numero}`
    })
})