var net = require('net');
var utils = require('./utils');

var clients = require('./clients.json');

net.createServer(function (socket) {

    socket.name = socket.remoteAddress + ":" + socket.remotePort

    var newClient = {
        "socket": socket,
        "address": socket.name,
        "ip": socket.remoteAddress,
        "port": socket.remotePort,
        "active": true,
        "currentTask": null
    }

    socket.on('data', function (data) {
        var task = null;
        message = utils.storeData();
    });

    socket.on('end', function () {
        for (var i = 0; i < clients.length; i++) {
            if (clients[i]["socket"] === socket) {
                clients[i]["active"] = false;
                clients[i]["socket"] = null;
            }
        }
    });

    clients = utils.addClient(clients, newClient);

    send_cmd(socket.name, "1", "1");

    function broadcast(message, sender) {
        clients.forEach(function (client) {
            if (client === sender) return;
            client.write(message);
        });
        process.stdout.write(message);
    }

}).listen(8888);

function send_cmd(socket_name, task, message) {
    var client = null;
    for (var i = 0; i < clients.length; i++) {
        var socket = clients[i];
        if (socket.address == socket_name) {
            client = socket.socket;
            clients[i]["currentTask"] = task;
            break;
        }
    }
    client.write(message);
}

function getClients() {
    return clients;
}

console.log("Chat server running at port 8888\n");