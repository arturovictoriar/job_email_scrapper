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
      console.log(`>> Created jobsArrays: ${JSON.stringify(jobsArrays, null, 4)}`);
      return jobsArrays;
    })
    .catch((err) => {
      console.log('>> Error while creating tutorial: ', err);
    });
};

exports.LoadJobOffers = async (jobProvider, jobAccount, objsJobOffer) => {
  const newJobOffers = [];
  const allCurrentJobOffers = await this.getAllByJobProviderAndJobAccount(jobProvider, jobAccount);
  for (const data of objsJobOffer) {
    let exists = false;
    const jobOffer = {
      name: data,
      jobProviderId: jobProvider.id,
      jobAccountEmailId: jobAccount.emailId,
    };
    for (const offers of allCurrentJobOffers) {
      if (offers.name === data) {
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
      console.log(`>> get offerName: ${JSON.stringify(offerName, null, 4)}`);
      return offerName;
    })
    .catch((err) => {
      console.log('>> Error while creating tutorial: ', err);
    });
};

exports.getAllJobOffers = () => {
  return JobOffer.findAll({ include: [User] })
    .then((allOffers) => {
      console.log(`>> get allOffers: ${JSON.stringify(allOffers, null, 4)}`);
      return allOffers;
    })
    .catch((err) => {
      console.log('>> Error allOffers: ', err);
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
      console.log(`>> get allOffers: ${JSON.stringify(allOffers, null, 4)}`);
      return allOffers;
    })
    .catch((err) => {
      console.log('>> Error allOffers: ', err);
    });
};
