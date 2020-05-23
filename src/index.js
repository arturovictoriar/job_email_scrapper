const unmejorempleo = require('./unmejorempleo');
const C = require('./constants');

(async () => {
  for (let i = 0; i < 2; i++) {
    const miEmpleo = new unmejorempleo.MejorEmpleo();
    await miEmpleo.startBrowser(true, true);
    await miEmpleo.login(C.username, C.password);
    const isAvailable = await miEmpleo.gotoVacantesPublicadas();
    if (!isAvailable) {
      process.exit();
    }
    const jobsName = await miEmpleo.getNamesJobs();
    const JobOffers = await unmejorempleo.MejorEmpleo.appendSelectorNameJobs(jobsName);
    const allEmails = JSON.parse(JSON.stringify(JobOffers));
    for (const jobOffer in JobOffers) {
      if (jobOffer) {
        allEmails[jobOffer].shift();
        const isAlive = await miEmpleo.gotoReviewApplication(JobOffers[jobOffer]);
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
    console.log(allEmails, i);
    await miEmpleo.closeBrowser();
  }
})();
