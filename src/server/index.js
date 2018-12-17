const express = require('express');
const os = require('os');
const bodyParser = require('body-parser');

const jsonParser = bodyParser.json();
const urlencodedParser = bodyParser.urlencoded({ extended: false });
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

app.use(express.static('dist'));

app.post('/api/users/register', jsonParser, (req, res) => {
  // console.log(req.body);
  const { firstName, lastName, username, password } = req.body;
  console.log(firstName, lastName, username, password);
  res.status(200);
  res.send({ status: 'okkkkkkkkkk' });
  res.end();
});

app.post('/api/installAgent', jsonParser, (req, res) => {
  // do somethings with devices // install agent....
  res.status(200);
  console.log('ok');
  res.send({ status: 'ok' });
  res.end();
});
app.post('/api/users/authenticate', jsonParser, (req, res) => {
  console.log(req.body);
  const user = {
    id: 'id',
    username: req.body.username,
    lastName: req.body.username,
  };
  const responseJson = {
    id: 'user.id',
    username: user.username,
    firstName: user.firstName,
    lastName: user.lastName,
    token: 'fake-jwt-token',
  };
  res.status(200);
  res.send(responseJson);
  res.end();
});

app.get('/api/getClients', (req, res) => {
  res.send('ok');
});

app.post('/api/getClients', jsonParser, (req, res) => {
  // console.log(req.body);
  // let { firstName, lastName, username, password } = req.body;
  // console.log(firstName, lastName, username, password);
  // let {id, task, pid} = req.body;
  res.status(200);
  const listOfAgent = getClients();
  console.log(listOfAgent);
  res.send({
    arr: listOfAgent,
  });
  res.end();
});

app.post('/api/fetch', jsonParser, (req, res) => {
  // console.log(req.body);
  // let { firstName, lastName, username, password } = req.body;
  // console.log(firstName, lastName, username, password);
  const { id, task, pid } = req.body;
  console.log(id, task, pid);
  let mess = task.toString();
  if (pid != 0) {
    mess = `${task} ${pid.toString()}`;
  }
  send_cmd(id, task.toString(), mess);
  res.status(200);
  res.send({ status: 'okkkkkkkkkk' });
  res.end();
});

// app.listen(8081, () => console.log("Listening on port 8081!"));
server.listen(8081, () => console.log('Listening on port 8081!'));

let userClients;

io.on('connection', clientForUser => {
  userClients = clientForUser;
  clientForUser.on('subscribeToTimer', interval => {
    client.emit('timer', message);
  });
});
// id   task  // task
// (socketname, "3", "3 1832")

// //////////////////////////////////////////
// ///////////////////////////////////////////
// /////////////////////////////////////////

const net = require('net');
const utils = require('./utils');

let clients = require('./clients.json');

net
  .createServer(socket => {
    socket.name = `${socket.remoteAddress}:${socket.remotePort}`;

    const newClient = {
      socket,
      address: socket.name,
      ip: socket.remoteAddress,
      port: socket.remotePort,
      active: true,
      currentTask: null,
    };

    socket.on('data', data => {
      const task = utils.getTask(clients, socket.name);
      message = utils.storeData(task, data);
      listClientForUser = io.sockets.clients();
      currentClient = listClientForUser;
      currentClient.emit('timer', `${message}\n`);
    });

    socket.on('end', () => {
      for (let i = 0; i < clients.length; i++) {
        if (clients[i].socket === socket) {
          clients[i].active = false;
          clients[i].socket = '';
          clients[i].port = '';
          clients[i].address = '';
        }
      }
    });

    clients = utils.addClient(clients, newClient);

    function broadcast(message, sender) {
      clients.forEach(client => {
        if (client === sender) {
          return;
        }
        client.write(message);
      });
      process.stdout.write(message);
    }
  })
  .listen(8888);

function send_cmd(socket_name, task, message) {
  let client = null;
  for (let i = 0; i < clients.length; i++) {
    const socket = clients[i];
    if (socket.address == socket_name) {
      client = socket.socket;
      clients[i].currentTask = task;
      break;
    }
  }
  client.write(message);
}

function getClients() {
  const result_listOfAgent = [];
  for (let i = 0; i < clients.length; i++) {
    result_listOfAgent.push({
      ip: clients[i].ip,
      port: clients[i].port,
      address: clients[i].address,
      active: clients[i].active,
    });
  }

  return result_listOfAgent;
}

console.log('Chat server running at port 8888\n');
