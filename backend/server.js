const express = require('express');
const cors = require('cors');
const db = require('./src/models');
const controllers = require('./src/controllers');

const app = express();
app.use(cors()); // Enable cors for all origins

(async () => {
  await db.sequelize.sync({ force: false });
  console.log(`Database & tables created!`);
})();

const asyncMiddleware = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

app.get('/api/useroffer/:page', (req, res) => {
  const limit = 10; // number of records per page
  let offset = 0;
  const { page } = req.params; // page number
  offset = limit * (page - 1);

  db.user_offer.findAndCountAll({
    limit,
    offset,
    order: [['emailSentAt', 'DESC']],
    include: [{
      model: db.job_offers,
      include: [{ model: db.job_account }, { model: db.job_providers }]
    }, {
      model: db.users,
    }],
    where: { emailSentAt: { [db.Sequelize.Op.not]: null } },
  }).then((data) => {
    const pages = Math.ceil(data.count / limit);
    res.status(200).json({
      _meta: {
        success: true,
        code: 200,
        totalCount: data.count,
        pageCount: pages,
        currentPage: parseInt(page, 10),
        perPage: limit,
      },
      result: data.rows,
    });
  });
});

app.get('/api/users/:page', (req, res) => {
  const limit = 10; // number of records per page
  let offset = 0;
  const { page } = req.params; // page number
  offset = limit * (page - 1);

  db.users
    .count()
    .then((count) => {
      db.users
        .findAndCountAll({
          include: [
            {
              model: db.job_offers,
            },
          ],
          limit,
          offset,
        })
        .then((data) => {
          const pages = Math.ceil(count / limit);
          res.status(200).json({
            _meta: {
              success: true,
              code: 200,
              totalCount: count,
              pageCount: pages,
              currentPage: parseInt(page, 10),
              perPage: limit,
            },
            result: data.rows,
          });
        });
    })
    .catch(function (error) {
      res.status(500).send(`Internal Server Error: ${error}`);
      console.log(error);
    });
});

app.get(
  '/api/countdata',
  asyncMiddleware(async (req, res) => {
    const users = await controllers.User.countUsers().catch((error) => {
      res.status(500).send(`Internal Server Error: ${error}`);
    });
    const sentEmails = await controllers.UserOffer.countSentEmails().catch((error) => {
      res.status(500).send(`Internal Server Error: ${error}`);
    });

    const jobAccount = await controllers.JobAccount.countJobAccounts().catch((error) => {
      res.status(500).send(`Internal Server Error: ${error}`);
    });
    const jobProviders = await controllers.JobProvider.countJobProviders().catch((error) => {
      res.status(500).send(`Internal Server Error: ${error}`);
    });

    res.status(200).json({
      count: {
        totalUsers: users,
        totalSentEmails: sentEmails,
        totalJobAccountsScrapped: jobAccount,
        totalJobProvidersScrapped: jobProviders,
      },
    });
  })
);

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

const PORT = process.env.PORT || 4000;

app.listen(PORT, console.log(`Server starter on port ${PORT}`));
