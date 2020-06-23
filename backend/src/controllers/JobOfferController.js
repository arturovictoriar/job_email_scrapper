const db = require('../models');

const JobOffer = db.job_offers;
const User = db.users;

/**
 * Creates a Job Offer without validations
 * @date 2020-06-22
 * @param {Object} joboffer
 * @returns {Promise<Model>} Return the Job Offer created
 */
exports.createJobOffer = (joboffer) => {
  return JobOffer.create({
    name: joboffer.name,
    jobProviderId: joboffer.jobProviderId,
    jobAccountEmailId: joboffer.jobAccountEmailId,
  })
    .then((joboffer) => {
      console.log(`>> Created joboffer: ${JSON.stringify(joboffer, null, 4)}`);
      return joboffer;
    })
    .catch((err) => {
      console.log('>> Error while creating tutorial: ', err);
    });
};

/**
 * Creates multiple Job Offers without validations
 * @date 2020-06-22
 * @param {Array} joboffer
 * @returns {Promise<Array<Model>>} Returns an array of Job Offers created
 */
exports.createJobOfferBulk = (jobsArrays) => {
  return JobOffer.bulkCreate(jobsArrays)
    .then((jobsArrays) => {
      return jobsArrays;
    })
    .catch((err) => {
      console.log('>> Error while creating JobOfferBulk: ', err);
    });
};

/**
 * Load all Job Offers and validate if it exists or not
 * @date 2020-06-22
 * @param {Object} jobProvider
 * @param {Object} jobAccount
 * @param {Array} objsJobOffer
 */
exports.LoadJobOffers = async (jobProvider, jobAccount, objsJobOffer) => {
  const newJobOffers = [];
  const allCurrentJobOffers = await this.getAllByJobProviderAndJobAccount(jobProvider, jobAccount);
  for (const data of objsJobOffer) {
    let exists = false;
    const jobOffer = {
      name: data.name,
      link: data.company,
      jobProviderId: jobProvider.id,
      jobAccountEmailId: jobAccount.emailId,
    };
    for (const offers of allCurrentJobOffers) {
      if (offers.link === data.company) {
        exists = true;
        break;
      }
    }
    if (exists === false) {
      newJobOffers.push(jobOffer);
    }
  }
  await this.createJobOfferBulk(newJobOffers);
};

/**
 * Get a Job Offer by Ids
 * @date 2020-06-22
 * @param {Object} jobOffer
 * @returns {Promise<Model|null>} Returns a Job Offer or null
 */
exports.getOfferByIds = (jobOffer) => {
  return JobOffer.findOne({
    where: {
      ...jobOffer,
    },
  })
    .then((offerName) => {
      return offerName;
    })
    .catch((err) => {
      console.log('>> Error getting OfferByIds: ', err);
    });
};

/**
 * Get all Job Offers joined with users
 * @date 2020-06-22
 * @returns {Promise<Model, boolean>} Retuen all the Job Offers
 */
exports.getAllJobOffers = () => {
  return JobOffer.findAll({ include: [User] })
    .then((allOffers) => {
      return allOffers;
    })
    .catch((err) => {
      console.log('>> Error getAllJobOffers: ', err);
    });
};

/**
 * Get all Job Offers filtered by Job Provider and Job Account
 * @date 2020-06-22
 * @param {Object} jobProvider
 * @param {Object} jobAccount
 * @returns {Promise<Model, boolean>} returns all the job offers filtered
 */
exports.getAllByJobProviderAndJobAccount = (jobProvider, jobAccount) => {
  return JobOffer.findAll({
    where: {
      jobProviderId: jobProvider.id,
      jobAccountEmailId: jobAccount.emailId,
    },
  })
    .then((allOffers) => {
      return allOffers;
    })
    .catch((err) => {
      console.log('>> Error in Function getAllByJobProviderAndJobAccount: ', err);
    });
};
