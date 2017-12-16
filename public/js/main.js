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
    var container = document.querySelector("#messages");
    container.insertAdjacentHTML("afterbegin", `
        <div class="col s12 m6">
            <div class="card hoverable">
                <div class="card ${expressConfig.stringsHelper.getColorBasedOnPrio(message.prio)} accent-2">
                    <div class="card-content white-text">
                        <div class="iconbox">
                            <div class="left"><i class="material-icons">error</i></div>
                            <div class="right"><input type="checkbox" id='${message._id}' /> <label for='${message._id}' >Done</label></div>
                        </div>

                        <span class="card-title">${message.client_name} - ${message.title}</span>

                        <p>${message.message}</p><br>

                        ${expressConfig.stringsHelper.fixTimeCalculation(new Date(message.created).getDay())}-${expressConfig.stringsHelper.fixTimeCalculation(new Date(message.created).getMonth())}-${expressConfig.stringsHelper.fixTimeCalculation(new Date(message.created).getFullYear())} ${expressConfig.stringsHelper.fixTimeCalculation(new Date(message.created).getHours())}:${expressConfig.stringsHelper.fixTimeCalculation(new Date(message.created).getMinutes())}
                    </div>
                </div>
            </div>
        </div>
    `);
}

document.addEventListener("DOMContentLoaded", initialize);
