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
