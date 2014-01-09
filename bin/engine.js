var Primus = require('Primus');

module.exports = function(app, db, collection, done) {
  'use strict';

  var server = new Primus(app, {
    transformer: 'engine.io'
  });


  server.on('connection', function(socket) {

    collection.find().toArray(function(err, items) {
      if (err) {
        socket.write({event: 'error', data: err});
      }
      socket.write({event: 'findAll', data: items});
    });

    socket.on('data', function(data) {
      if (data.event === 'newIdea') {
        collection.insert(data.data, function(err, docs) {
          if (err) {
            socket.write({event: 'error', data: err})
            return;
          }

          socket.write({event: 'insert', data: docs});
        });
      }
    });

    socket.on('close', function() {
      console.log('Connection closed');
    });

    done(socket);


    // setInterval(function() {
    //   collection.find().toArray(function(err, items) {
    //     if (err) {
    //       socket.write({event: 'error', data: err});
    //     }
    //     socket.write({event: 'findAll', data: items});
    //   });
    // }, 60000);
  });
}