const db = require('../models');

const JobOffer = db.job_offers;

exports.createJobOffer = (jobProviderId, joboffer) => {
  return JobOffer.create({
    name: joboffer.name,
    jobProviderId,
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

exports.LoadJobOffers = (jobProviderId, objsJobOffer) => {
  const arr = [];
  for (const data of objsJobOffer) {
    arr.push({ name: data, jobProviderId });
  }
  return this.createJobOfferBulk(arr);
};

exports.getOfferByName = (offerName) => {
  return JobOffer.findOne({ where: { name: offerName } });
  /* .then((offerName) => {
      console.log(`>> get offerName: ${JSON.stringify(offerName, null, 4)}`);
      return offerName;
    })
    .catch((err) => {
      console.log('>> Error while creating tutorial: ', err);
    }); */
};

exports.getAllJobOffers = () => {
  return JobOffer.findAll()
    .then((allOffers) => {
      console.log(`>> get allOffers: ${JSON.stringify(allOffers, null, 4)}`);
      return allOffers;
    })
    .catch((err) => {
      console.log('>> Error allOffers: ', err);
    });
};
