const db = require('../models');

const JobOffer = db.job_offers;

exports.createJobOffer = (joboffer) => {
  return JobOffer.create({
    name: joboffer.name,
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

exports.LoadJobOffers = (objsJobOffer) => {
  const arr = [];
  for (const data of objsJobOffer) {
    arr.push({ name: data });
  }
  return this.createJobOfferBulk(arr);
};

exports.getOfferByName = (offerName) => {
  return JobOffer.findOne({ where: { name: offerName } })
    .then((offerName) => {
      console.log(`>> get offerName: ${JSON.stringify(offerName, null, 4)}`);
      return offerName;
    })
    .catch((err) => {
      console.log('>> Error while creating tutorial: ', err);
    });
};
