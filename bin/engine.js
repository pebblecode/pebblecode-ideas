var Primus = require('primus');
var Emitter = require('primus-emitter');

module.exports = function(app, db, collection, done) {
  'use strict';

  var server = new Primus(app, {
    transformer: 'engine.io'
  });

  server.use('emitter', Emitter);


  server.on('connection', function(socket) {


    // Seed the front end with data right away
    collection.find().toArray(function(err, items) {
      if (err) {
        socket.send('error', err, function(data) {
          console.log('error ack', data)
        });
        return;
      }

      socket.send('findAll', items, function(data) {
        console.log('findAll ack', data);
      })
    });

    socket.on('newIdea', function(data) {
      collection.insert(data, function(err, docs) {
        if (err) {
          socket.send('error', err, function(data) {
            console.log('error ack', data)
          });
          return;
        }

        socket.send('insert', docs, function(data) {
          console.log('insert ack', data);
        });
      });
    });


    socket.on('close', function() {
      console.log('Connection closed');
    });

    done(socket);

  });
}