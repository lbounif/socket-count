const socket = io()

socket.on('countUpdated', (count) => {
    console.log('The count has been updated', count)
})

document.querySelector('#increment').addEventListener('click', () => {
    console.log('Clicked!')
    //2. send event from client to server
    socket.emit('increment')
})