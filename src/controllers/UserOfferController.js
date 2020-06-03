const db = require('../models');

const UserOffer = db.user_offer;

exports.updateSentEmail = (userOffer) => {
  return UserOffer.update(
    { sentEmail: Date.now() },
    { where: { userEmail: userOffer.userEmail, jobOfferId: userOffer.jobOfferId } }
  ).then((updateSentEmail) => {
    console.log(`>> get updateSentEmail: ${JSON.stringify(updateSentEmail, null, 4)}`);
    return updateSentEmail;
  });
};

exports.findByUserAndOffer = (userOffer) => {
  return UserOffer.findOne({
    where: { userEmail: userOffer.userEmail, jobOfferId: userOffer.jobOfferId },
  }).then((userOffer) => {
    console.log(`>> get userOffer: ${JSON.stringify(userOffer, null, 4)}`);
    return userOffer;
  });
};

exports.findAllUserOffer = () => {
  return UserOffer.findAll().then((userOffer) => {
    console.log(`>> get all users: ${JSON.stringify(userOffer, null, 4)}`);
    return userOffer;
  });
};

exports.createUserOffer = (userOffer) => {
  return UserOffer.create({
    userEmail: userOffer.userEmail,
    jobOfferId: userOffer.jobOfferId,
    company: userOffer.company,
  })
    .then((jobAccount) => {
      console.log(
        `>> Created UserOffer Relation many to many: ${JSON.stringify(jobAccount, null, 4)}`
      );
      return jobAccount;
    })
    .catch((err) => {
      console.log('>> Error while creating UserOffer relation: ', err);
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
