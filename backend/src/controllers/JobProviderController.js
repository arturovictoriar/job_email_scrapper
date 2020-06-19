const db = require('../models');

const JobProvider = db.job_providers;

exports.createJobProvider = (name) => {
  return JobProvider.create({
    name,
  })
    .then((jobprovider) => {
      return jobprovider;
    })
    .catch((err) => {
      console.log('>> Error while creating JobProvider: ', err);
    });
};

exports.getProviderByName = (providerName) => {
  return JobProvider.findOne({ where: { name: providerName } })
    .then((providerName) => {
      return providerName;
    })
    .catch((err) => {
      console.log('>> Error in function getProviderByName: ', err);
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

exports.countJobProviders = async () => {
  return JobProvider.count()
    .then((count) => {
      console.log(`>> Get count all Job Providers: ${count}`);
      return count;
    })
    .catch(function (error) {
      console.log(error);
    });
};
