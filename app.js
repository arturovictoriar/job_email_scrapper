const express = require('express');
const db = require('./src/models');
const save = require('./src/util/save');
const scrapper = require('./src/util/scrapper');
const sendemail = require('./src/util/sendemails');
const controllers = require('./src/controllers');

const app = express();

const implementationScrapper = async () => {
  const dataScrapper = await scrapper.main();
  await save.unMejorEmpleoSave(dataScrapper);
  const allSentOffers = await sendemail.main();
  await controllers.UserOffer.updateSentEmail(allSentOffers);
};

db.sequelize.sync({ force: false }).then(() => {
  console.log(`Database & tables created!`);
  implementationScrapper();
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

const PORT = process.env.PORT || 4000;

app.listen(PORT, console.log(`Server starter on port ${PORT}`));
