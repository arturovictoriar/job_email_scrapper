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

exports.LoadUsers = async (jobOffer, allData) => {
  const newUsers = [];
  const newUserOffers = [];
  for (const userData of allData[jobOffer.name].emails) {
    const userObj = { name: userData.name, email: userData.email };
    const userOffer = {
      userEmail: userData.email,
      jobOfferId: jobOffer.id,
      company: allData[jobOffer.name].company,
    };
    const userFound = await this.findByEmail(userObj.email);
    const userOfferFound = await UserOfferController.findByUserAndOffer(userOffer);

    if (userFound === null) {
      newUsers.push(userObj);
    }
    if (userOfferFound === null) {
      newUserOffers.push(userOffer);
    }
  }
  await this.createBulkUser(newUsers);
  await UserOfferController.createBulkUserOffer(newUserOffers);
  return 'OK';
};

exports.getAllUsers = () => {
  return User.findAll({ include: [Offer] })
    .then((allusers) => {
      console.log(`>> get allusers: ${JSON.stringify(allusers, null, 4)}`);
      return allusers;
    })
    .catch((err) => {
      console.log('>> Error getAllUsers: ', err);
    });
};

exports.findByEmail = (email) => {
  return User.findOne({ where: { email } })
    .then((allusers) => {
      console.log(`>> Search by email: ${JSON.stringify(allusers, null, 4)}`);
      return allusers;
    })
    .catch((err) => {
      console.log('>> Error findByEmail: ', err);
    });
};
