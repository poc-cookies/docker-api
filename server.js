'use strict';

const Hapi = require('hapi');

const server = new Hapi.Server();

server.connection({
  port: '8000'
});

server.route([
  {
    method: 'GET',
    path: '/api/items',
    handler: (request, reply) => {
      return reply('Get items');
    }
  },
  {
    method: 'GET',
    path: '/api/items/{id}',
    handler: (request, reply) => {
      return reply('Get item with given id: ' + request.params.id);
    }
  }
]);

server.route({
  method: 'POST',
  path: '/api/items',
  handler: (request, reply) => {
    return reply('Post item');
  }
});

server.route({
  method: 'PUT',
  path: '/api/items/{id}',
  handler: (request, reply) => {
    return reply('Put item with given id: ' + request.params.id);
  }
});

server.route({
  method: 'DELETE',
  path: '/api/items/{id}',
  handler: (request, reply) => {
    return reply('Delete item with given id: ' + request.params.id);
  }
});

server.route({
  method: 'GET',
  path: '/',
  handler: (request, reply) => {
    return reply('Non-existing page...');
  }
});

server.start((err) => {
  if (err) throw err;
  console.log('Server running at: ' + server.info.uri);
});
