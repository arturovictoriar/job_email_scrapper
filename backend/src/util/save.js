/**
 * Save the emails, jobs and links in the database
 */
// imports the Database controllers and the credential of email scrapper
const controllers = require('../controllers');
const C = require('../config/scrapper.config'); // Replace with environment variable

/**
 * formatData: change the format of the data recieved
 * @date 2020-06-22
 * @param {any} data objects of emails, Job name and Job link
 * @returns {any} data formated
 */
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

/**
 * unMejorEmpleoSave: save the emails, jobs and links in data base
 * @date 2020-06-22
 * @param {any} rawData data from the scraper
 * @returns {any}
 */
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
// export the function
module.exports = { unMejorEmpleoSave };
