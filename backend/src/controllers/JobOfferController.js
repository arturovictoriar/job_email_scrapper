const db = require('../models');

const JobOffer = db.job_offers;
const User = db.users;

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

exports.createJobOfferBulk = (jobsArrays) => {
  return JobOffer.bulkCreate(jobsArrays)
    .then((jobsArrays) => {
      return jobsArrays;
    })
    .catch((err) => {
      console.log('>> Error while creating JobOfferBulk: ', err);
    });
};

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

exports.getOfferByIds = (jobOffer) => {
  return JobOffer.findOne({
    where: {
      name: jobOffer.name,
      jobAccountEmailId: jobOffer.jobAccountEmailId,
      jobProviderId: jobOffer.jobProviderId,
    },
  })
    .then((offerName) => {
      return offerName;
    })
    .catch((err) => {
      console.log('>> Error getting OfferByIds: ', err);
    });
};

exports.getAllJobOffers = () => {
  return JobOffer.findAll({ include: [User] })
    .then((allOffers) => {
      return allOffers;
    })
    .catch((err) => {
      console.log('>> Error getAllJobOffers: ', err);
    });
};

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
