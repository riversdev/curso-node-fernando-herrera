const socketClient = io()

const lblOnline = document.getElementById('lblOnline')
const lblOffline = document.getElementById('lblOffline')
const txtMessage = document.getElementById('txtMessage')
const btnSend = document.getElementById('btnSend')

socketClient.on('connect', () => {
    console.log('Conectado !')

    lblOnline.style.display = ''
    lblOffline.style.display = 'none'
})

socketClient.on('disconnect', () => {
    console.log('Desconectado !')

    lblOffline.style.display = ''
    lblOnline.style.display = 'none'
})

socketClient.on('send-message', (payload) => {
    console.log('Listen message: ', payload)
})

btnSend.addEventListener('click', () => {
    const message = txtMessage.value

    const payload = {
        message,
        date: new Date().getTime()
    }

    socketClient.emit('send-message', payload, (data) => console.log('En el cliente, desde el server: ', data))
})