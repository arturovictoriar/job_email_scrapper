const controllers = require('../controllers');
const C = require('../config/scrapper.config'); // Replace with environment variable

const formatData = (data) => {
  return new Promise((resolve) => {
    const newData = [];
    const keys = Object.keys(data);

    for (const key of keys) {
      for (const offer of data[key]) {
        newData.push({ name: key, company: offer.company, emails: offer.emails });
      }
    }
    resolve(newData);
  });
};

// eslint-disable-next-line no-unused-vars
const unMejorEmpleoSave = async (rawData) => {
  const providerName = 'Un mejor empleo';
  console.log('Getting Job board');
  let jobProvider = await controllers.JobProvider.getProviderByName(providerName);
  if (jobProvider === null) {
    jobProvider = await controllers.JobProvider.createJobProvider(providerName);
  }
  const jobAccount = await controllers.JobAccount.createJobAccount(C.username);
  const data = await formatData(rawData);
  console.log('Loading Job Offers');
  await controllers.JobOffer.LoadJobOffers(jobProvider, jobAccount, data);
  console.log('Loading Users');
  for (const dataObj of data) {
    const jobOffer = await controllers.JobOffer.getOfferByIds({
      name: dataObj.name,
      link: dataObj.company,
      jobAccountEmailId: jobAccount.emailId,
      jobProviderId: jobProvider.id,
    });
    if (jobOffer) {
      await controllers.User.LoadUsers(jobOffer, dataObj);
    }
  }
  console.log('Finish unMejorempleoSave Function');
};

module.exports = { unMejorEmpleoSave };
