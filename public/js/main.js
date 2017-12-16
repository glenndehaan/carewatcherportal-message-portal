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

    socket.on('message_complete', function(data) {
        console.log('message_complete', data);

        var element = document.querySelector(`[data-id="${data._id}"]`);

        if(element) {
            element.setAttribute("checked", "checked");
            element.setAttribute("disabled", "disabled");
            element.dataset.completed = "true";
        }
    });

    addCompletedEvents();
}

function addCompletedEvents() {
    var checkBoxes = document.querySelectorAll(".completed-checkbox");

    for(let checkBox = 0; checkBox < checkBoxes.length; checkBox++){
        checkBoxes[checkBox].addEventListener("click", function (e) {
            var completed = e.target.dataset.completed;
            var id = e.target.dataset.id;

            if(completed === "false") {
                e.target.setAttribute("checked", "checked");
                e.target.setAttribute("disabled", "disabled");
                e.target.dataset.completed = "true";

                postDataToApi(id);
            }
        });
    }
}

function postDataToApi(id) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("POST", "/api/admin/message");
    xmlhttp.setRequestHeader("Content-Type", "application/json");
    xmlhttp.send(JSON.stringify({_id: id}));
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
                            <div class="right"><input type="checkbox" class="completed-checkbox" id='${message._id}' data-id="${message._id}" data-completed="${message.completed}" ${message.completed ? 'checked="checked" disabled' : ''} /> <label for='${message._id}' >Done</label></div>
                        </div>

                        <span class="card-title">${message.client_name} - ${message.title}</span>

                        <p>${message.message}</p><br>

                        ${expressConfig.stringsHelper.fixTimeCalculation(new Date(message.created).getDay())}-${expressConfig.stringsHelper.fixTimeCalculation(new Date(message.created).getMonth())}-${expressConfig.stringsHelper.fixTimeCalculation(new Date(message.created).getFullYear())} ${expressConfig.stringsHelper.fixTimeCalculation(new Date(message.created).getHours())}:${expressConfig.stringsHelper.fixTimeCalculation(new Date(message.created).getMinutes())}
                    </div>
                </div>
            </div>
        </div>
    `);

    document.querySelector(`[data-id="${message._id}"]`).addEventListener("click", function (e) {
        var completed = e.target.dataset.completed;
        var id = e.target.dataset.id;

        if(completed === "false") {
            e.target.setAttribute("checked", "checked");
            e.target.setAttribute("disabled", "disabled");
            e.target.dataset.completed = "true";

            postDataToApi(id);
        }
    });
}

document.addEventListener("DOMContentLoaded", initialize);
