const socket = io('http://localhost:8000');

const form = document.getElementById('container2');
const messageInp = document.getElementById('messageInp');
const messageContainer = document.querySelector('.container');
var audio = new Audio('../img/tone.mp3')

const append = (message, position)=>{
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
    if(position == 'left'){
        audio.play();
    }
}

form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const message = messageInp.value;
    append(`You: ${message}`, 'right');
    socket.emit('send', message);
    messageInp.value = '';
})

const name = prompt("Entar your name to join GChat");
socket.emit('new-user-joined', name);

socket.on('user-joined', name=>{
    append(`${name} joined the chat`, 'left')
});

socket.on('receive', data=>{
    append(`${data.name}: ${data.message}`, 'left');
});

socket.on('leave', name=>{
    append(`${name}: Left the Chat`, 'left');
});