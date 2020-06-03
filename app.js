const express = require('express');
const db = require('./src/models');
const controllers = require('./src/controllers');
// eslint-disable-next-line node/no-unpublished-require
const data = require('./data.json');
/* const unmejorempleo = require('./src/util/scrapper'); */
const C = require('./src/config/scrapper.config'); // Replace with environment variable

const app = express();

// eslint-disable-next-line no-unused-vars
const unMejorEmpleoSave = async () => {
  await controllers.JobProvider.createAllproviders();
  const jobProvider = await controllers.JobProvider.getProviderByName('Un mejor empleo');
  const jobAccount = await controllers.JobAccount.createJobAccount(C.username);
  await controllers.JobOffer.LoadJobOffers(jobProvider, jobAccount, Object.keys(data));
  for (const jobOfferName of Object.keys(data)) {
    const jobOffer = await controllers.JobOffer.getOfferByIds({
      name: jobOfferName,
      jobAccountEmailId: jobAccount.emailId,
      jobProviderId: jobProvider.id,
    });
    if (jobOffer) {
      await controllers.User.LoadUsers(jobOffer, data);
    }
  }
  console.log('FINISH SCRAPPER FUNCTION');
};

db.sequelize.sync({ force: false }).then(() => {
  console.log('Drop and re-sync db.');
  unMejorEmpleoSave();
});

app.get('/', (req, res) => {
  controllers.User.getAllUsersWithOffers().then((usersData) => {
    res.send(usersData);
  });
});

app.get('/userofferall', (req, res) => {
  controllers.UserOffer.findAllUserOffer().then((usersData) => {
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

/* const createJobOffer = async (jobOffer) => {
  const jobOfferFound = await controllers.JobOffer.getOfferByIds(jobOffer);
  if (jobOfferFound === null) {
    return controllers.JobOffer.createJobOffer(jobOffer);
  }
  return jobOfferFound;
};

const createUser = async (user) => {
  const userFound = await controllers.User.findByEmail(user.email);
  if (userFound === null) {
    return controllers.User.createUser(user);
  }
  return userFound;
};

const createUserOffer = async (userOffer) => {
  const userOfferFound = await controllers.UserOffer.findByUserAndOffer(userOffer);
  if (userOfferFound === null) {
    return controllers.UserOffer.createUserOffer(userOffer);
  }
  return userOfferFound;
};
// eslint-disable-next-line no-unused-vars
const fakeData = async () => {
  await createAllproviders();
  const testJobAccount = await createJobAccount(C.username);
  const testProvider = await controllers.JobProvider.getProviderByName('Jobble');
  const testOffer = await createJobOffer({
    name: 'Software engineer',
    jobProviderId: testProvider.id,
    jobAccountEmailId: testJobAccount.emailId,
  });

  const testOffer2 = await controllers.JobOffer.createJobOffer({
    name: 'Software engineer in nanotech',
    jobProviderId: testProvider.id,
    jobAccountEmailId: testJobAccount.emailId,
  });
  const testUser1 = await createUser({
    name: 'arturo victoria',
    email: 'arvichan@gmail.com',
  });

  const testUser2 = await createUser({
    name: 'sebastian lopez',
    email: 'sebas119@gmail.com',
  });

  await createUserOffer({
    userEmail: testUser1.email,
    jobOfferId: testOffer.id,
    company: 'My TEST company',
  });

  await createUserOffer({
    userEmail: testUser2.email,
    jobOfferId: testOffer.id,
    company: 'My TEST company',
  });
  await createUserOffer({
    userEmail: testUser2.email,
    jobOfferId: testOffer2.id,
    company: 'My TEST company',
  });

  console.log('FINISH FAKEDATA FUNCTION');
}; */
