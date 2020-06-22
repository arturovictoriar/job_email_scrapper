const unmejorempleo = require('./unmejorempleo');
const C = require('../config/scrapper.config');

const main = async () => {
  console.log('Working on Un mejor empleo...');
  const miEmpleo = new unmejorempleo.MejorEmpleo();
  try {
    await miEmpleo.startBrowser(true, true, true);
    await miEmpleo.login(C.username, C.password);
    const isAvailable = await miEmpleo.gotoVacantesPublicadas();
    if (!isAvailable) {
      process.exit();
    }

    let existMorePages = false;
    let allEmailsInfo = {};
    do {
      // eslint-disable-next-line prefer-const
      let jobsName = await miEmpleo.getNamesJobs();
      // eslint-disable-next-line prefer-const
      let JobOffers = await unmejorempleo.MejorEmpleo.appendSelectorNameJobs(jobsName);
      // eslint-disable-next-line prefer-const
      let allEmails = JSON.parse(JSON.stringify(JobOffers));
      for (const jobOffer in JobOffers) {
        if (jobOffer) {
          let index = 0;
          for (const company of JobOffers[jobOffer]) {
            allEmails[jobOffer][index].emails.shift();
            const isAlive = await miEmpleo.gotoReviewApplication(company.emails);
            if (!isAlive) {
              await miEmpleo.returnVacantesAplicadas();
              index++;
              // eslint-disable-next-line no-continue
              continue;
            }
            const basicInfoCandidate = await miEmpleo.getBasicInfoCandidate();
            const allCurriculumSelector = await unmejorempleo.MejorEmpleo.curriculumSelectors(
              basicInfoCandidate
            );
            const emailOnejob = await miEmpleo.getEmails(allCurriculumSelector, [], 0);
            allEmails[jobOffer][index].emails.push(...emailOnejob);
            await miEmpleo.returnVacantesAplicadas();
            index++;
          }
        }
      }
      // eslint-disable-next-line node/no-unsupported-features/es-syntax
      allEmailsInfo = { ...allEmails, ...allEmailsInfo };
      existMorePages = await miEmpleo.morePageVacancies();
    } while (existMorePages);

    console.log(JSON.stringify(allEmailsInfo));
    await miEmpleo.closeBrowser();
    console.log('Finish Scrapper with puppeteer');
    return allEmailsInfo;
  } catch (error) {
    await miEmpleo.closeBrowser();
    return {};
  }
};

module.exports = { main };

// Comment this in production
// main();
