const db = require('./src/models');
const save = require('./src/util/save');
const scrapper = require('./src/util/scrapper');
const sendemail = require('./src/util/sendemails');
const controllers = require('./src/controllers');

/**
 * Main function that runs all the scraper service
 * @date 2020-06-22
 */
const implementationScrapper = async () => {
  const dataScrapper = await scrapper.main();
  await save.unMejorEmpleoSave(dataScrapper);
  const allSentOffers = await sendemail.main();
  await controllers.UserOffer.updateSentEmail(allSentOffers);
};

(async () => {
  await db.sequelize.sync({ force: false });
  console.log(`Database & tables created!`);
  await implementationScrapper();
  console.log('Finish All!!!');
})();
