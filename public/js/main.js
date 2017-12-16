function initialize() {
    var socket = io.connect('http://' + expressConfig.hostname + ':' + expressConfig.port);
    socket.on('connect', function() {
        console.log('[SOCKET] Connected!');
    });

    socket.on('disconnect', function() {
        console.log('[SOCKET] Disconnected!');
    });

    socket.on('error', function() {
        console.log('[SOCKET] Error!');
    });

    socket.on('message', function(data) {
        console.log('message', data);
        addMessageToDOM(data);
    });
}

function addMessageToDOM(message) {
    var ul = document.querySelector("#messages");
    var li = document.createElement("li");
    li.appendChild(document.createTextNode(message._id + ' - ' + message.id + ' - ' + message.title + ' - ' + message.prio));
    ul.appendChild(li);
}

document.addEventListener("DOMContentLoaded", initialize);
