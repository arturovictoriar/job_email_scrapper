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

exports.findByUserAndOffer = (objUser, objOffer) => {
  return UserOffer.findOne({
    where: { userEmail: objUser.email, jobOfferId: objOffer.id },
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
