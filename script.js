function reload(data) {
    let lines = data.split('\n');
    let h = document.getElementById('hook');
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
    xhttp.open("GET", "userinput.txt", true);
    xhttp.send();
}

function sendMessageAndReload() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            reload(xhttp.response.data);
        }
    };
    xhttp.open("POST", "/api/message", true);
    xhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhttp.responseType = 'json';
    xhttp.send('message=' + encodeURIComponent(document.getElementById("message").value));
}


window.onload = (event) => {
    getMessagesAndReload();
    document.getElementById("butt").onclick = (ev) => {
        ev.preventDefault();
        sendMessageAndReload();
        return false;
    }
}
