'use strict';

const Hapi = require('hapi');
const WebSocket = require('ws');

const whiteOrigins = ['*'];

const server = new Hapi.Server();

server.connection({
  port: '8000'
});

server.route([
  {
    method: 'GET',
    path: '/api/items',
    config: {
      cors: {
        origin: whiteOrigins
      }
    },
    handler: (request, reply) => {

      let items = [{
        id: '00000001',
        name: 'Item 1'
      }, {
        id: '00000002',
        name: 'Item 2'
      }, {
        id: '00000003',
        name: 'Item 3'
      }];

      return reply(items);
    }
  },
  {
    method: 'GET',
    path: '/api/items/{id}',
    config: {
      cors: {
        origin: whiteOrigins
      }
    },
    handler: (request, reply) => {
      return reply({
        id: request.params.id,
        name: 'Item ' + request.params.id
      });
    }
  }
]);

server.route({
  method: 'POST',
  path: '/api/items',
  config: {
    cors: {
      origin: whiteOrigins
    }
  },
  handler: (request, reply) => {
    return reply('Post item');
  }
});

server.route({
  method: 'PUT',
  path: '/api/items/{id}',
  config: {
    cors: {
      origin: whiteOrigins
    }
  },
  handler: (request, reply) => {
    return reply('Put item with given id: ' + request.params.id);
  }
});

server.route({
  method: 'DELETE',
  path: '/api/items/{id}',
  config: {
    cors: {
      origin: whiteOrigins
    }
  },
  handler: (request, reply) => {
    return reply('Delete item with given id: ' + request.params.id);
  }
});

server.route({
  method: 'GET',
  path: '/',
  config: {
    cors: {
      origin: ['*']
    }
  },
  handler: (request, reply) => {
    return reply('Non-existing page...');
  }
});

server.start((err) => {
  if (err) throw err;
  console.log('Server running at: ' + server.info.uri);
});


const wsPort = 8001;
const wss = new WebSocket.Server({port: wsPort});

wss.on('connection', (ws) => {
  console.log('Connection opened.');

  ws.on('message', (msg) => {
    console.log(`received: ${msg}`);
    wss.clients.forEach((client) => {
      if (client.readyState !== WebSocket.OPEN) return;
      client.send(msg);
    });
  });

  ws.on('close', () => {
    console.log('Connection closed.');
  });
});
