const db = require('../models');

const JobProvider = db.job_providers;

exports.createJobProvider = (jobprovider) => {
  return JobProvider.create({
    name: jobprovider.name,
  })
    .then((jobprovider) => {
      console.log(`>> Created jobprovider: ${JSON.stringify(jobprovider, null, 4)}`);
      return jobprovider;
    })
    .catch((err) => {
      console.log('>> Error while creating tutorial: ', err);
    });
};

exports.getProviderByName = (providerName) => {
  return JobProvider.findOne({ where: { name: providerName } })
    .then((providerName) => {
      console.log(`>> get providerName: ${JSON.stringify(providerName, null, 4)}`);
      return providerName;
    })
    .catch((err) => {
      console.log('>> Error while creating tutorial: ', err);
    });
};
