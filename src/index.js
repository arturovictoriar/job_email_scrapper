const unmejorempleo = require('./unmejorempleo');
const C = require('./constants');

(async () => {
  for (let i = 0; i < 20; i++) {
    const miEmpleo = new unmejorempleo.MejorEmpleo();
    await miEmpleo.startBrowser();
    await miEmpleo.login(C.username, C.password);
    await miEmpleo.gotoVacantesPublicadas();
    const basicInfoCandidate = await miEmpleo.getBasicInfoCandidate();
    const allCurriculumSelector = await unmejorempleo.MejorEmpleo.curriculumSelectors(
      basicInfoCandidate
    );
    await miEmpleo.getEmail(allCurriculumSelector, [], 0).then((emails) => {
      console.log(emails);
    });
    await miEmpleo.closeBrowser();
  }
})();
