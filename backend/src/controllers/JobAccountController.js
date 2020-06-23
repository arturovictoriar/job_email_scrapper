const db = require('../models');

const JobAccount = db.job_account;

/**
 * Creates a Job Account without validations
 * @date 2020-06-22
 * @param {Object} emailId
 * @returns {Promise<Model>} Returns the job account created
 */
exports.create = (emailId) => {
  return JobAccount.create({
    emailId,
  })
    .then((jobAccount) => {
      console.log(`>> Created jobAccount: ${JSON.stringify(jobAccount, null, 4)}`);
      return jobAccount;
    })
    .catch((err) => {
      console.log('>> Error while creating JobAccount: ', err);
    });
};

/**
 * Creates or get a Job Account if exists
 * @date 2020-06-22
 * @param {Object} emailId
 * @returns {Promise<Model>} Returns the job account created
 */
exports.createJobAccount = async (emailId) => {
  const jobAccountFound = await this.findByEmailId(emailId);
  if (jobAccountFound === null) {
    return this.create(emailId);
  }
  return jobAccountFound;
};

/**
 * Get a Job Account by emailId
 * @date 2020-06-22
 * @param {Object} emailId
 * @returns {Promise<Model|null>} Returns the job account by emailId or null
 */
exports.findByEmailId = (emailId) => {
  return JobAccount.findOne({
    where: { emailId },
  })
    .then((jobAccount) => {
      return jobAccount;
    })
    .catch((err) => {
      console.log('>> Error getting JobAccount ByEmailId: ', err);
    });
};

/**
 * Get total number of jobAccounts
 * @date 2020-06-22
 * @returns {Promise<number>} Returns a number
 */
exports.countJobAccounts = async () => {
  return JobAccount.count()
    .then((count) => {
      console.log(`>> Get count all Job Accounts: ${count}`);
      return count;
    })
    .catch(function (error) {
      console.log(error);
    });
};
