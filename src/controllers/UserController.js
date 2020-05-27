const db = require('../models');

const User = db.users;

exports.createUser = (jobOfferId, jobProviderId, user) => {
  return User.create({
    name: user.name,
    email: user.email,
    sentEmail: user.sentEmail,
    jobProviderId,
    jobOfferId,
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
      console.log('>> Error while creating tutorial: ', err);
    });
};

exports.LoadUsers = (jobOffer, jobProvider, allData) => {
  const arr = [];
  for (const userData of allData[jobOffer.name]) {
    arr.push({
      ...userData,
      jobProviderId: jobProvider.id,
      jobOfferId: jobOffer.id,
    });
  }
  if (arr.length) {
    return this.createBulkUser(arr);
  }
  return 'OK';
};

exports.getAllUsers = () => {
  return User.findAll()
    .then((allusers) => {
      console.log(`>> get allusers: ${JSON.stringify(allusers, null, 4)}`);
      return allusers;
    })
    .catch((err) => {
      console.log('>> Error getAllUsers: ', err);
    });
};
