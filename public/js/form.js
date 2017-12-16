function initialize() {
    var submitButton = document.querySelector("#submit");
    var action = submitButton.dataset.action;

    submitButton.addEventListener("click", function(e) {
        e.preventDefault();

        var id_field = document.querySelector("#id").value;
        var client_name_field = document.querySelector("#client_name").value;

        postDataToApi(action, id_field, client_name_field);
    });
}

function postDataToApi(action, id, client_name) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("POST", "/api/admin/room");
    xmlhttp.setRequestHeader("Content-Type", "application/json");
    xmlhttp.send(JSON.stringify({action: action, id: id, client_name: client_name}));
    xmlhttp.onload = function () {
        window.location = "/admin/room";
    };
}

document.addEventListener("DOMContentLoaded", initialize);
