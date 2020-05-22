const unmejorempleo = require('./unmejorempleo');
const C = require('./constants');

(async () => {
  const miEmpleo = new unmejorempleo.MejorEmpleo();
  await miEmpleo.startBrowser(true, true);
  await miEmpleo.login(C.username, C.password);
  await miEmpleo.gotoVacantesPublicadas();
  await miEmpleo.closeBrowser();
})();
