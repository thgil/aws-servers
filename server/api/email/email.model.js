'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));
var Schema = mongoose.Schema;

var EmailSchema = new Schema({
  email: {
    type: String,
    lowercase: true
  },
  time: { type : Date, default: Date.now }
});

/**
 * Validations
 */

// Validate empty email
EmailSchema
  .path('email')
  .validate(function(email) {
    return email.length;
  }, 'Email cannot be blank');

// Validate email is not taken
EmailSchema
  .path('email')
  .validate(function(value, respond) {
    var self = this;
    return this.constructor.findOneAsync({ email: value })
      .then(function(mail) {
        if (mail) {
          if (self.id === mail.id) {
            return respond(true);
          }
          return respond(false);
        }
        return respond(true);
      })
      .catch(function(err) {
        throw err;
      });
  }, 'The specified email address is already in use.');

module.exports = mongoose.model('Email', EmailSchema);
