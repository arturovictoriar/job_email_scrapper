const Sequelize = require('sequelize');
const dbConfig = require('../config/db.config');

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  // operatorsAliases: false,

  /* pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  }, */
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.users = require('./User')(sequelize, Sequelize);
db.job_providers = require('./JobProvider')(sequelize, Sequelize);
db.job_offers = require('./JobOffer')(sequelize, Sequelize);
db.user_offer = require('./UserOffer')(sequelize, Sequelize);

/* db.users.belongsToMany(db.job_providers, { through: 'user_providers' });
db.job_providers.belongsToMany(db.users, { through: 'user_providers' }); */

db.users.belongsToMany(db.job_offers, { through: db.user_offer });
db.job_offers.belongsToMany(db.users, { through: db.user_offer });

db.job_providers.hasMany(db.job_offers);
db.job_offers.belongsTo(db.job_providers);
// db.job_providers.hasMany(db.users);
// db.job_offers.hasMany(db.users);

module.exports = db;
