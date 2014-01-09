module.exports = function(db, collection, socket) {
  return function(req, res, next) {

    var body = req.body.Body;
    var from = req.body.From;

     var newIdea = {
      submittedBy: from,
      text: body,
      votesYes: 0,
      votesNo: 0
    };

    collection.insert(newIdea, function(err, docs) {
      if (err) {
        socket.write({event: 'error', data: err})
        return;
      }

      socket.write({event: 'insert', data: docs});
    });

  }
}