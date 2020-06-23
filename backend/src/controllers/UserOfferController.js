const db = require('../models');

const UserOffer = db.user_offer;

/**
 * Get all User Offer filtered by jobOfferId field
 * @date 2020-06-22
 * @param {string} jobOfferId
 * @returns {Promise<Array<Model>>} Returns an array that contains all the models
 */
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

/**
 * Creates multiple UserOffers
 * @date 2020-06-22
 * @param {Array} userOfferArray
 * @returns {Promise<Array<Model>>} Returns an array that contains all the userOffer models
 */
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

/**
 * Update the sentEmailAt field of userOffer relation with the Date.now method
 * @date 2020-06-22
 * @param {Object} userOffer
 * @returns {Promise<Array<number, number>>} Return an array of the number of elements updated
 */
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

/**
 * Method that clean and send the sentEmailArr data to the query methods
 * @date 2020-06-22
 * @param {Array} sentEmailArr
 */
exports.updateSentEmail = async (sentEmailArr) => {
  const userOffer = {
    company: null,
    jobOfferId: null,
    userEmail: null,
  };
  console.log('Loading updateSentEmail');
  for (const offerSent of sentEmailArr) {
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

/**
 * Get total number of sent emails
 * @date 2020-06-22
 * @returns {Promise<number>} Return a number that represent the total number of sent emails
 */
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

/**
 * Get all the User Offers joined with Job Offers and Users paginated to display on frontend
 * @date 2020-06-22
 * @param {Object} pageNum
 * @returns {Promise<Array<Model>>} Returns an array that contains all the models founded
 */
exports.findAllUserOfferPaginated = (pageNum) => {
  const limit = 10; // number of records per page
  let offset = 0;
  const { page } = pageNum; // page number
  offset = limit * (page - 1);

  return UserOffer.findAndCountAll({
    limit,
    offset,
    order: [['emailSentAt', 'DESC']],
    include: [
      {
        model: db.job_offers,
        include: [{ model: db.job_account }, { model: db.job_providers }],
      },
      {
        model: db.users,
      },
    ],
    where: { emailSentAt: { [db.Sequelize.Op.not]: null } },
  }).then((data) => {
    const pages = Math.ceil(data.count / limit);
    return {
      _meta: {
        success: true,
        code: 200,
        totalCount: data.count,
        pageCount: pages,
        currentPage: parseInt(page, 10),
        perPage: limit,
      },
      result: data.rows,
    };
  });
};
