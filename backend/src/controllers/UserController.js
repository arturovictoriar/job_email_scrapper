const db = require('../models');
const UserOfferController = require('./UserOfferController');

const Offer = db.job_offers;
const User = db.users;

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

exports.findByEmail = (email) => {
  return User.findOne({ where: { email } })
    .then((allusers) => {
      return allusers;
    })
    .catch((err) => {
      console.log('>> Error findByEmail: ', err);
    });
};

exports.getAllUsers = () => {
  return User.findAll()
    .then((allusers) => {
      return allusers;
    })
    .catch((err) => {
      console.log('>> Error getAllUsers: ', err);
    });
};

exports.countUsers = () => {
  return User.count()
    .then((count) => {
      return count;
    })
    .catch(function (error) {
      console.log('>> Error in CountUsers function: ', error);
    });
};
