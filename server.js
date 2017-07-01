'use strict';

const Hapi = require('hapi');

const whiteOrigins = ['http://localhost:8080'];

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
      return reply('Get items');
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
      return reply('Get item with given id: ' + request.params.id);
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
