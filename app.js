const express = require('express');
const db = require('./src/models');
const controllers = require('./src/controllers');
// eslint-disable-next-line node/no-unpublished-require
const data = require('./data.json');
/* const unmejorempleo = require('./src/util/scrapper'); */

const app = express();

// eslint-disable-next-line no-unused-vars
const fakeData = async () => {
  const testProvider = await controllers.JobProvider.createJobProvider({
    name: 'testprovider',
  });
  const testOffer = await controllers.JobOffer.createJobOffer(testProvider.id, {
    name: 'Software engineer',
  });
  const testOffer2 = await controllers.JobOffer.createJobOffer(testProvider.id, {
    name: 'Software engineer in nanotech',
  });

  const testUser1 = await controllers.User.createUser({
    name: 'arturo victoria',
    email: 'arvichan@gmail.com',
  });

  const testUser2 = await controllers.User.createUser({
    name: 'sebastian lopez',
    email: 'sebas119@gmail.com',
  });

  await testUser1.addJob_offers(testOffer);
  await testUser2.addJob_offers([testOffer, testOffer2]);
  console.log('FINISH');
};

// eslint-disable-next-line no-unused-vars
const scrapperFunction = async () => {
  await controllers.JobProvider.createJobProvider({
    name: 'unmejorempleo',
  });
  const jobProvider1 = await controllers.JobProvider.getProviderByName('unmejorempleo');
  await controllers.JobOffer.LoadJobOffers(jobProvider1.id, Object.keys(data));
  for (const jobOfferName of Object.keys(data)) {
    const jobOffer = await controllers.JobOffer.getOfferByName(jobOfferName);
    await controllers.User.LoadUsers(jobOffer, data);
  }
  console.log('FINISH');
};

// db.sequelize.sync();
db.sequelize.sync({ force: true }).then(() => {
  console.log('Drop and re-sync db.');
  // fakeData();
  scrapperFunction();
});

app.get('/', (req, res) => {
  controllers.User.getAllUsers().then((usersData) => {
    res.send(usersData);
  });
});

app.get('/userofferall', (req, res) => {
  controllers.UserOffer.findAll().then((usersData) => {
    res.send(usersData);
  });
});

app.get('/jobofferall', (req, res) => {
  controllers.JobOffer.getAllJobOffers().then((offerdata) => {
    res.send(offerdata);
  });
});

app.get('/useroffer', (req, res) => {
  controllers.JobOffer.getOfferByName('Software engineer').then((offerObj) => {
    controllers.UserOffer.findByUserAndOffer({ email: 'sebas119@gmail.com' }, offerObj).then(
      (userOffer) => {
        controllers.UserOffer.updateSentEmail(userOffer).then((last) => {
          res.send(last);
        });
      }
    );
  });
});

app.get('/alldata', (req, res) => {
  res.send(data);
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, console.log(`Server starter on port ${PORT}`));
