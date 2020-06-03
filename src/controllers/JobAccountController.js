const db = require('../models');

const JobAccount = db.job_account;

exports.createJobAccount = (emailId) => {
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

exports.findByEmailId = (emailId) => {
  return JobAccount.findOne({
    where: { emailId },
  }).then((jobAccount) => {
    console.log(`>> found jobAccount: ${JSON.stringify(jobAccount, null, 4)}`);
    return jobAccount;
  });
};
