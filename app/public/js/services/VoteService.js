angular.module('pebbleidea')
  .factory('$Vote', ['$rootScope', '$Primus', '$q', function($rootScope, $Primus, $q) {
    'use strict';

    var VoteService = {};

    /**
     *  This function takes a incoming vote and idea, and returns
     *  a promise for when the vote has been updated
     */
    VoteService.castVote = function(data) {

      var deferred = $q.defer();

      $Primus.send('castVote', data, function(err, docs) {
        if (err) {
          deferred.reject(err);
          return;
        }

        deferred.resolve(docs[0]);
      });

      return deferred.promise;
    }

    return VoteService;

  }])