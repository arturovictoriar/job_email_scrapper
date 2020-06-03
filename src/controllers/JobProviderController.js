const db = require('../models');

const JobProvider = db.job_providers;

exports.createJobProvider = (name) => {
  return JobProvider.create({
    name,
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

exports.createBulkJobProvider = (providerArray) => {
  return JobProvider.bulkCreate(providerArray, { ignoreDuplicates: true })
    .then((user) => {
      console.log(`>> Created user: ${JSON.stringify(user, null, 4)}`);
      return user;
    })
    .catch((err) => {
      console.log('>> Error while creating providerArray: ', err);
    });
};

exports.createAllproviders = async () => {
  const providers = [
    { name: 'Un mejor empleo' },
    { name: 'Jobble' },
    { name: 'El Empleo' },
    { name: 'Computrabajo' },
    { name: 'Jobomas' },
  ];
  await this.createBulkJobProvider(providers);
};
