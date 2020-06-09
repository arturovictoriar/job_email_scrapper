const controllers = require('../controllers');
// eslint-disable-next-line node/no-unpublished-require
/* const data = require('../../data.json'); */
/* const unmejorempleo = require('./src/util/scrapper'); */
const C = require('../config/scrapper.config'); // Replace with environment variable

// eslint-disable-next-line no-unused-vars
const unMejorEmpleoSave = async (data) => {
  const providerName = 'Un mejor empleo';
  let jobProvider = await controllers.JobProvider.getProviderByName(providerName);
  if (jobProvider === null) {
    jobProvider = await controllers.JobProvider.createJobProvider(providerName);
  }
  const jobAccount = await controllers.JobAccount.createJobAccount(C.username);
  await controllers.JobOffer.LoadJobOffers(jobProvider, jobAccount, Object.keys(data));
  for (const jobOfferName of Object.keys(data)) {
    const jobOffer = await controllers.JobOffer.getOfferByIds({
      name: jobOfferName,
      jobAccountEmailId: jobAccount.emailId,
      jobProviderId: jobProvider.id,
    });
    if (jobOffer) {
      await controllers.User.LoadUsers(jobOffer, data);
    }
  }
  console.log('FINISH SCRAPPER FUNCTION');
};

module.exports = { unMejorEmpleoSave };
