'use strict';

import Email from './email.model';
import config from '../../config/environment';

function validationError(res, statusCode) {
  statusCode = statusCode || 422;
  return function(err) {
    res.status(statusCode).json(err);
  }
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
}

function respondWith(res, statusCode) {
  statusCode = statusCode || 200;
  return function() {
    res.status(statusCode).end();
  };
}

exports.add = function(req, res) {
  var newEmail = new Email(req.body);
  newEmail.saveAsync()
    .spread(function(email) {
      console.log(email);
      return res.status(201).end();
    })
    .catch(validationError(res));
};
