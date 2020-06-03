const controllers = {};

controllers.JobProvider = require('./JobProviderController');
controllers.JobOffer = require('./JobOfferController');
controllers.User = require('./UserController');
controllers.UserOffer = require('./UserOfferController');
controllers.JobAccount = require('./JobAccountController');

module.exports = controllers;
