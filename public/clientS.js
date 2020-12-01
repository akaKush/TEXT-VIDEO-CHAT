const socket = io('http://localhost:3000');

socket.on('chat-message', data =>{
    console.log(data)
});

const message = document.getElementById('message');
      handle = document.getElementById('handle');
      button =  document.getElementById('submit');
      output = document.getElementById('output');
      typing = document.getElementById('typing');



//  enviem que estem escrivint un missatge
message.addEventListener('keypress', () => {
    socket.emit('userTyping'. handle.value)
})


//  enviar missatges a clients
button.addEventListener('click', () => {
    socket.emit('chat', {
        message: message.value,
        handle: handle.value
    })
    document.getElementById('message').value="";
}) 


//   escoltem a events del server
socket.on('chat', (data)=>{
    typing.innerHTML = "";
    output.innerHTML += '<p> <strong>' + data.handle + ': </strong>' + data.message + '</p>'
})

socket.on('userTyping', (data) => {
    typing.innerHTML = '<p><em>' + data + ' is typing... </em></p>'
})