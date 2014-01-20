var Primus = require('primus');
var Emitter = require('primus-emitter');
var ObjectId = require('mongodb').ObjectID;
var Idea = require('./../lib/Idea');


/**
 *  The engine file handles all the socket-based tomfoolery.
 *  First the Primus object is created, using engine.io as it's
 *  transport backend, and setting up a namespace-based event emitter
 *
 *  Once an incoming connection has been recieved, the socket is added
 *  to an in-memory connection pool which allows us to communicate with the
 *  clients available to us.
 *
 *  All other functions within the connection state connect the app with the database
 */
module.exports = function(app, db, collection, clients) {
  'use strict';

  // Set up the websocket connection and event emitter
  var server = new Primus(app, {
    transformer: 'engine.io'
  });
  server.use('emitter', Emitter);

  // Listen for a new incoming websocket connection
  server.on('connection', function(socket) {

    // Add the client to the connection pool
    clients.push(socket);

    // Seed the front end with data right away
    collection.find().toArray(function(err, items) {
      if (err) {
        socket.send('error', err);
        return;
      }

      socket.send('initData', items);
    });

    // Listen for a new incoming idea from the frontend
    socket.on('newIdea', function(data) {

      var newIdea = new Idea(data);

      collection.insert(newIdea, function(err, docs) {
        if (err) {
          socket.send('error', err);
          return;
        }

        clients.forEach(function(client) {
          client.send('insert', docs[0]);
        });
      });
    });

    // Listen for an incoming vote
    socket.on('castVote', function(data, done) {
      if (!data.idea._id) {
        done('No valid ID was passed to vote');
        return;
      }

      if (data.vote === 'Yes') {
        collection.update({_id: new ObjectId(data.idea._id)}, {$inc: { 'votesYes': 1 }}, {upsert:true, safe: true}, done);
      } else {
        collection.update({_id: new ObjectId(data.idea._id)}, {$inc: { 'votesNo': 1 }}, {upsert:true, safe: true}, done);
      }
    });

    socket.on('deleteIdea', function(idea, done) {
      if (!idea._id) {
        done('No valid ID was passed to delete');
        return;
      }

      collection.remove({_id: new ObjectId(idea._id)}, {safe: true}, done);
    });

    // Handle a websocket being closed and remove the old client connection
    socket.on('end', function() {
      var clientsSocketIndex = clients.indexOf(socket);
      if ((socket) && (clientsSocketIndex !== -1)) {
        clients.splice(clientsSocketIndex, 1);
      }
    });
  });
};
