let openInbox = document.getElementById("messages");
openInbox.click();

function showMessages(id) {
    let x = document.getElementById(id);
    if (x.className.indexOf("w3-show") == -1) {
        x.className += " w3-show";
        x.previousElementSibling.className += " w3-deep-orange";
    } else {
        x.className = x.className.replace(" w3-show", "");
        x.previousElementSibling.className =
            x.previousElementSibling.className.replace(" w3-deep-orange", "");
    }
}

function httpGet(url) {

    return new Promise(function(resolve, reject) {

        let xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);

        xhr.onload = function() {
            if (this.status == 200) {
                resolve(this.response);
            } else {
                var error = new Error(this.statusText);
                error.code = this.status;
                reject(error);
            }
        };

        xhr.onerror = function() {
            reject(new Error("Network Error"));
        };

        xhr.send();
    });
}

function formatDate(date) {

    let d = new Date(date);
    d = [
        '0' + d.getDate(),
        '0' + (d.getMonth() + 1),
        '' + d.getFullYear(),
        '0' + d.getHours(),
        '0' + d.getMinutes()
    ];

    for (let i = 0; i < d.length; i++) {
        d[i] = d[i].slice(-2);
    }

    return d.slice(0, 3).join('.') + '  ' + d.slice(3).join(':');
}


function httpPost(url, data) {
    return new Promise(function(resolve, reject) {
        let xhr = new XMLHttpRequest();

        xhr.open('POST', url, true);
        xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');

        xhr.onload = (info) => {
            resolve(info);
        };

        xhr.onerror = () => {
            reject(new Error('Network Error'));
        };

        xhr.send(JSON.stringify(data));
    });
}

function sendMessage() {

    const url = 'https://db2-test-task.herokuapp.com/api/messages';

    const data = {
        author: document.getElementById('message-author').value,
        text: document.getElementById('message-text').value,
        email: document.getElementById('message-email').value
    };

    Promise.resolve(url)
        .then((url) => httpPost(url, data)
        )
        .then(() => {
            document.getElementById('send-message').style.display = 'none';
        })
        .catch((error) => {
            alert(error);
        });
}

function loadMessages() {
    const url = 'https://db2-test-task.herokuapp.com/api/messages/list/0';

    Promise.resolve(url)
        .then((url) => httpGet(url))
        .then(JSON.parse)
        .then((messages) => {
            if (messages.data.length > 0) {
                renderMessages(messages);
            }
        })
        .catch((error) => {
            alert(error);
        });
}


function renderMessages(messages) {
    let messagesItems = document.querySelectorAll('.message-item');

    // Cleans all messages
    Array.from(messagesItems).filter((messagesItem) => {
        return messagesItem.id !== 'message0';
    }).forEach((messagesItem) => {
        messagesItem.parentNode.removeChild(messagesItem);
    });

    messages.data.forEach((message) => {
        let messagesList = document.querySelector('.messages-list');
        let messageItem = document.querySelector('.message-item');
        let messageItemClone = messageItem.cloneNode(true);

        messageItem.setAttribute('id', message._id);
        messagesList.appendChild(messageItemClone);

        let authorElem = document.querySelector('.message-author');
        authorElem.innerText = message.author;

        let textElem = document.querySelector('.message-text');
        textElem.innerText = message.text;

        let dateElem = document.querySelector('.message-date');
        dateElem.innerText = formatDate(message.create_date);
    });
}
loadMessages();
setInterval(loadMessages, 3000);