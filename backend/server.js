const express = require('express');
const cors = require('cors');
const db = require('./src/models');
const controllers = require('./src/controllers');

/* Rest API made on express */

const app = express();
app.use(cors()); // Enable cors for all origins

/* Synchronize the database with the models */
(async () => {
  await db.sequelize.sync();
  console.log(`Database synchronized`);
})();

/**
 * Async Middleware function to use synchronous express
 * @date 2020-06-22
 * @param {function} fn
 */
const asyncMiddleware = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

/**
 * Endpoint that get and send paginated User Offers in JSON format
 * @date 2020-06-22
 */
app.get(
  '/api/useroffer/:page',
  asyncMiddleware(async (req, res) => {
    const userOffer = await controllers.UserOffer.findAllUserOfferPaginated(req.params).catch(
      (error) => {
        res.status(500).send(`Internal Server Error: ${error}`);
      }
    );
    res.status(200).json(userOffer);
  })
);

/**
 * Endpoint that shows some statistics like total users, sentEmails, JobAccounts
 * and JobProviders
 * @date 2020-06-22
 */
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

const PORT = process.env.PORT || 4000;

app.listen(PORT, console.log(`Server starter on port ${PORT}`));
