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
  for (const data of objsJobOffer) {
    const jobOffer = {
      name: data,
      jobProviderId: jobProvider.id,
      jobAccountEmailId: jobAccount.emailId,
    };
    const jobOfferFound = await this.getOfferByIds(jobOffer);
    if (jobOfferFound === null) {
      newJobOffers.push(jobOffer);
    }
  }
  return this.createJobOfferBulk(newJobOffers);
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
