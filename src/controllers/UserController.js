const db = require('../models');

const Offer = db.job_offers;
const User = db.users;
const UserOffer = db.user_offer;

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
  return User.bulkCreate(userArray, { ignoreDuplicates: true })
    .then((user) => {
      console.log(`>> Created user: ${JSON.stringify(user, null, 4)}`);
      return user;
    })
    .catch((err) => {
      console.log('>> Error while creating userArray: ', err);
    });
};

exports.createBulkUserOffer = (userOfferArray) => {
  return UserOffer.bulkCreate(userOfferArray)
    .then((user) => {
      console.log(`>> Created userOfferArray: ${JSON.stringify(user, null, 4)}`);
      return user;
    })
    .catch((err) => {
      console.log('>> Error while creating userOfferArray: ', err);
    });
};

exports.LoadUsers = async (jobOffer, allData) => {
  const users = [];
  const usersOffers = [];
  for (const userData of allData[jobOffer.name].emails) {
    users.push({ name: userData.name, email: userData.email });
    usersOffers.push({
      userEmail: userData.email,
      jobOfferId: jobOffer.id,
      company: allData[jobOffer.name].company,
    });
  }
  await this.createBulkUser(users);
  await this.createBulkUserOffer(usersOffers);
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
