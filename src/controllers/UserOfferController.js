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

exports.updateSentEmailByCompany = (userOffer) => {
  return UserOffer.update(
    { sentEmail: Date.now() },
    { where: { company: userOffer.company, jobOfferId: userOffer.jobOfferId } }
  ).then((updateSentEmail) => {
    console.log(`>> get updateSentEmailByCompany: ${JSON.stringify(updateSentEmail, null, 4)}`);
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

exports.findAllByOffer = (jobOfferId) => {
  return UserOffer.findAll({
    where: { jobOfferId },
  }).then((userOffer) => {
    console.log(`>> get all users by offers: ${JSON.stringify(userOffer, null, 4)}`);
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

exports.updateBulkByCompany = async (sentEmailObj) => {
  const userOffer = {
    company: null,
    jobOfferId: null,
  };
  for (const offerSent of sentEmailObj) {
    const companies = Object.keys(offerSent.companies);
    userOffer.jobOfferId = offerSent.jobOfferId;
    for (const company of companies) {
      userOffer.company = company;
      console.log(offerSent.companies[company].sentEmail);
      if (offerSent.companies[company].sentEmail === true) {
        this.updateSentEmailByCompany(userOffer);
        console.log(userOffer);
      }
    }
  }
};
