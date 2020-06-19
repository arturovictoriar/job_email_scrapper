const db = require('../models');

const UserOffer = db.user_offer;

exports.updateSentEmailByUserAndOffer = (userOffer) => {
  return UserOffer.update(
    { emailSentAt: Date.now() },
    { where: { userEmail: userOffer.userEmail, jobOfferId: userOffer.jobOfferId } }
  )
    .then((updateSentEmail) => {
      return updateSentEmail;
    })
    .catch((error) => {
      console.log(`Function updateSentEmailByUserAndOffer has ${error}`);
    });
};

exports.updateSentEmailByCompany = (userOffer) => {
  return UserOffer.update(
    { emailSentAt: Date.now() },
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
  })
    .then((userOffer) => {
      return userOffer;
    })
    .catch((err) => {
      console.log('>> Error in function findAllByOffer of UserOfferController: ', err);
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

exports.updateSentEmail = async (sentEmailObj) => {
  const userOffer = {
    company: null,
    jobOfferId: null,
    userEmail: null,
  };
  console.log('Loading updateSentEmail');
  for (const offerSent of sentEmailObj) {
    const companies = Object.keys(offerSent.companies);
    userOffer.jobOfferId = offerSent.jobOfferId;
    for (const company of companies) {
      userOffer.company = company;
      if (offerSent.companies[company].sentEmail) {
        for (const email of offerSent.companies[company].emails) {
          userOffer.userEmail = email;
          await this.updateSentEmailByUserAndOffer(userOffer);
        }
      }
    }
  }
};

exports.countSentEmails = () => {
  return UserOffer.count({ where: { emailSentAt: { [db.Sequelize.Op.not]: null } } })
    .then((count) => {
      console.log(`>> Get count all Sent Emails: ${count}`);
      return count;
    })
    .catch(function (error) {
      console.log(error);
    });
};
