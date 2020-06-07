function reload(data) {
    let lines = data.split('\n');
    let h = document.getElementById('board');
    h.innerHTML = '';
    for (let line of lines) {
        let p = document.createElement('p');
        p.textContent = line;
        h.appendChild(p);
    }
}

function getMessagesAndReload() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            reload(xhttp.response);
        }
    };
    xhttp.open("GET", "msgs/msg-1.txt", true);
    xhttp.send();
}

function sendMessageAndReload() {
    let messageEl = document.getElementById("message");
    let message = messageEl.value;
    messageEl.value = '';

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            reload(xhttp.response.data);
        }
    };
    xhttp.open("POST", "/api/message", true);
    xhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhttp.responseType = 'json';
    xhttp.send('message=' + encodeURIComponent(message));
}


window.onload = (event) => {
    getMessagesAndReload();
    document.getElementById("form").addEventListener('submit', (ev) => {
        ev.preventDefault();
        sendMessageAndReload();
        return false;
    });
    document.addEventListener('keydown', (ev) => {
        if (ev.key == "Enter") {
            ev.preventDefault();
            sendMessageAndReload();
        }
    });
}

window.setInterval(getMessagesAndReload, 1000)
