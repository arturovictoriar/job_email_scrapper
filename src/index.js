const unmejorempleo = require('./unmejorempleo');
const C = require('./constants');

const main = async () => {
  const miEmpleo = new unmejorempleo.MejorEmpleo();
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
        allEmails[jobOffer].shift();
        let noExitVacante = false;
        const isAlive = await miEmpleo.gotoReviewApplication(JobOffers[jobOffer]).catch(() => {
          noExitVacante = true;
        });
        if (noExitVacante) {
          await miEmpleo.returnVacantesAplicadas();
          await miEmpleo.gotoReviewApplication(JobOffers[jobOffer]);
        }
        if (!isAlive) {
          await miEmpleo.returnVacantesAplicadas();
          // eslint-disable-next-line no-continue
          continue;
        }
        const basicInfoCandidate = await miEmpleo.getBasicInfoCandidate();
        const allCurriculumSelector = await unmejorempleo.MejorEmpleo.curriculumSelectors(
          basicInfoCandidate
        );
        const emailOnejob = await miEmpleo.getEmails(allCurriculumSelector, [], 0);
        allEmails[jobOffer].push(...emailOnejob);
        await miEmpleo.returnVacantesAplicadas();
      }
    }
    // eslint-disable-next-line node/no-unsupported-features/es-syntax
    allEmailsInfo = { ...allEmails, ...allEmailsInfo };
    existMorePages = await miEmpleo.morePageVacancies();
  } while (existMorePages);

  console.log(allEmailsInfo);
  return allEmailsInfo;
};

main();
