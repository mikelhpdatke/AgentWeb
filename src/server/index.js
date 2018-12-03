const express = require("express");
const os = require("os");
const bodyParser = require("body-parser");
var jsonParser = bodyParser.json();
var urlencodedParser = bodyParser.urlencoded({ extended: false });
const app = express();
var server = require("http").Server(app);
var io = require("socket.io")(server);

app.use(express.static("dist"));

app.post("/api/users/register", jsonParser, function(req, res) {
  //console.log(req.body);
  let { firstName, lastName, username, password } = req.body;
  console.log(firstName, lastName, username, password);
  res.status(200);
  res.send({ status: "okkkkkkkkkk" });
  res.end();
});
app.post("/api/users/authenticate", jsonParser, function(req, res) {
  console.log(req.body);
  let user = {
    id: "id",
    username: req.body.username,
    lastName: req.body.username
  };
  let responseJson = {
    id: "user.id",
    username: user.username,
    firstName: user.firstName,
    lastName: user.lastName,
    token: "fake-jwt-token"
  };
  res.status(200);
  res.send(responseJson);
  res.end();
});

app.get("/api/status", (req, res) => {
  res.send("ok");
});

app.get("/api/fetch", (req, res) => {
  send_cmd("abc", "xyz", "helloWorld");
  res.send("ok");
});

//app.listen(8081, () => console.log("Listening on port 8081!"));
server.listen(8081, () => console.log("Listening on port 8081!"));

io.on("connection", clientForUser => {
    clientForUser.on("subscribeToTimer", interval => {
     client.emit("timer", message);
  });
});
// (socketname, "3", "3 1832")

////////////////////////////////////////////
/////////////////////////////////////////////
///////////////////////////////////////////

var net = require("net");
var utils = require("./utils");

var clients = require("./clients.json");

// var ioclient = require('socket.io-client')('http://localhost:8081');
// ioclient.on('connect', function() {

// });

net.createServer(function(socket) {
    socket.name = socket.remoteAddress + ":" + socket.remotePort;

    var newClient = {
      socket: socket,
      address: socket.name,
      ip: socket.remoteAddress,
      port: socket.remotePort,
      active: true,
      currentTask: null
    };

    socket.on("data", function(data) {
      var task = null;
      message = utils.storeData();
      ioclient.emit('subscribeToTimer', message);
    });

    socket.on("end", function() {
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
      clients.forEach(function(client) {
        if (client === sender) return;
        client.write(message);
      });
      process.stdout.write(message);
    }
  })
  .listen(8888);

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
