const db = require('../models');
const UserOfferController = require('./UserOfferController');

const Offer = db.job_offers;
const User = db.users;

/**
 * Creates a User without validations
 * @date 2020-06-22
 * @param {Object} user
 * @returns {Promise<Model>} Return the User created
 */
exports.createUser = (user) => {
  return User.create({
    name: user.name,
    email: user.email,
    sentEmail: user.sentEmail,
  })
    .then((user) => {
      console.log(`>> Created user: ${JSON.stringify(user, null, 4)}`);
      return user;
    })
    .catch((err) => {
      console.log('>> Error while creating tutorial: ', err);
    });
};

/**
 * Creates multiple Users
 * @date 2020-06-22
 * @param {Array} userArray
 * @returns {Promise<Array<Model>>} Returns an array of Users created
 */
exports.createBulkUser = (userArray) => {
  return User.bulkCreate(userArray)
    .then((user) => {
      console.log(`>> Created user: ${JSON.stringify(user, null, 4)}`);
      return user;
    })
    .catch((err) => {
      console.log('>> Error while creating userArray: ', err);
    });
};

/**
 * Create multiple Users and add association with userOffer model
 * @date 2020-06-22
 * @param {Object} jobOffer
 * @param {Object} dataObj
 */
exports.LoadUsers = async (jobOffer, dataObj) => {
  const newUsers = [];
  const newUserOffers = [];
  const allCurrentUsers = await this.getAllUsers();
  const allCurrentUserOffer = await UserOfferController.findAllByOffer(jobOffer.id);
  for (const userData of dataObj.emails) {
    let existUser = false;
    let existUserOffer = false;
    const userObj = { name: userData.name, email: userData.email };
    const userOffer = {
      userEmail: userData.email,
      jobOfferId: jobOffer.id,
      company: dataObj.company,
    };
    for (const users of allCurrentUsers) {
      if (users.email === userData.email) {
        existUser = true;
        break;
      }
    }
    if (existUser === false) {
      newUsers.push(userObj);
    }
    for (const userOff of allCurrentUserOffer) {
      if (userOff.userEmail === userData.email) {
        existUserOffer = true;
        break;
      }
    }
    if (existUserOffer === false) {
      newUserOffers.push(userOffer);
    }
  }
  await this.createBulkUser(newUsers);
  await UserOfferController.createBulkUserOffer(newUserOffers);
};

/**
 * Get all users joined with offers model
 * @date 2020-06-22
 * @returns {Promise<{count: number, rows: Model[]}>} Return an Object that contains
 * the total number of rows and the data of that rows
 */
exports.getAllUsersWithOffers = () => {
  return User.findAndCountAll({
    include: [
      {
        model: Offer,
      },
    ],
  })
    .then((allusers) => {
      return allusers;
    })
    .catch((err) => {
      console.log('>> Error in getAllUsersWithOffers: ', err);
    });
};

/**
 * Get a User by email
 * @date 2020-06-22
 * @param {String} email
 * @returns {Promise<Model|null>} Return the model found or null if doesn't exist
 */
exports.findByEmail = (email) => {
  return User.findOne({ where: { email } })
    .then((allusers) => {
      return allusers;
    })
    .catch((err) => {
      console.log('>> Error findByEmail: ', err);
    });
};

/**
 * Get all Users data
 * @date 2020-06-22
 * @returns {Promise<Array<Model>>} Returns an array that contains all the models
 */
exports.getAllUsers = () => {
  return User.findAll()
    .then((allusers) => {
      return allusers;
    })
    .catch((err) => {
      console.log('>> Error getAllUsers: ', err);
    });
};

/**
 * Get total number of users
 * @date 2020-06-22
 * @returns {Promise<number>} Return a number that represent the total number of users
 */
exports.countUsers = () => {
  return User.count()
    .then((count) => {
      return count;
    })
    .catch(function (error) {
      console.log('>> Error in CountUsers function: ', error);
    });
};
