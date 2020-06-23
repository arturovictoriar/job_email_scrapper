const db = require('../models');

const JobProvider = db.job_providers;

/**
 * Creates a Job Provider
 * @date 2020-06-22
 * @param {string} name
 * @returns {Promise<Model>} Returns the created Job Provider
 */
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

/**
 * Get a Job Provider by name
 * @date 2020-06-22
 * @param {string} name
 * @returns {Promise<Model|null>} Returns a Job Provider or null
 */
exports.getProviderByName = (name) => {
  return JobProvider.findOne({ where: { name } })
    .then((jobprovider) => {
      return jobprovider;
    })
    .catch((err) => {
      console.log('>> Error in function getProviderByName: ', err);
    });
};

/**
 * Create multiple Job Providers
 * @date 2020-06-22
 * @param {Array} providerArray
 * @returns {Promise<Array<Model>>} Returns an Array of created Job Providers
 */
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

/**
 * Get total number of Job Providers
 * @date 2020-06-22
 * @returns {Promise<number>} Returns a number
 */
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
