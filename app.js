const express = require('express');
const db = require('./src/models');
const controllers = require('./src/controllers');
// const data = require('./data');
const unmejorempleo = require('./src/util/scrapper');

const app = express();

// eslint-disable-next-line no-unused-vars
const fakeData = async () => {
  await controllers.JobProvider.createJobProvider({
    name: 'unmejorempleo',
  });
  const jobProvider1 = await controllers.JobProvider.getProviderByName('unmejorempleo');
  const data = await unmejorempleo.main();
  await controllers.JobOffer.LoadJobOffers(Object.keys(data));
  for (const jobOfferName of Object.keys(data)) {
    const jobOffer = await controllers.JobOffer.getOfferByName(jobOfferName);
    await controllers.User.LoadUsers(jobOffer, jobProvider1, data);
  }
  console.log('FINISH');
};

// db.sequelize.sync();
db.sequelize.sync(/* { force: true } */).then(() => {
  console.log('Drop and re-sync db.');
  // fakeData();
});

app.get('/', (req, res) => {
  controllers.User.getAllUsers().then((usersData) => {
    res.send(usersData);
  });
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, console.log(`Server starter on port ${PORT}`));
