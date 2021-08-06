//socket import
const socket = io()

//get textarea id
let textarea = document.querySelector('#textarea')
//get msgarea id
let messageArea = document.querySelector('.message__area')

//prompt
let clientname;

do{
     clientname = prompt('Please Enter Name :')
}while(!clientname)

//event trigger e = event recive 
textarea.addEventListener('keyup', (e) => {
    if(e.key === 'Enter') {
        sendMessage(e.target.value) // textarea value target
    }
})

function sendMessage(message) {
    let msg = {
        user: clientname,
        message: message.trim()
    }
    // Append 
    appendMessage(msg, 'outgoing')
    textarea.value = ''
    scrollToBottom()

    // Send to server 
    socket.emit('message', msg)

}

function appendMessage(msg, type) {
    let mainDiv = document.createElement('div') 
    let className = type
    mainDiv.classList.add(className, 'message')

    //create markup
    let markup = `
        <h4>${msg.user}</h4>
        <p>${msg.message}</p>
    `
    //markup add in main div
    mainDiv.innerHTML = markup
    //maindiv append on messagearea
    messageArea.appendChild(mainDiv)
}

// Recieve messages 
socket.on('message', (msg) => {
    appendMessage(msg, 'incoming')
    scrollToBottom()
})

function scrollToBottom() {
    messageArea.scrollTop = messageArea.scrollHeight
}