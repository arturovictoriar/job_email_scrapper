const Sequelize = require('sequelize');
const dbConfig = require('../config/db.config');

/* Creates connection with Database using sequelize */
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
});

/* db Object that contains the connection, the Sequelize module and
all the models */
const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

/* Import and export all models */
db.users = require('./User')(sequelize, Sequelize);
db.job_providers = require('./JobProvider')(sequelize, Sequelize);
db.job_offers = require('./JobOffer')(sequelize, Sequelize);
db.user_offer = require('./UserOffer')(sequelize, Sequelize);
db.job_account = require('./JobAccount')(sequelize, Sequelize);

/* Super many-to-many relationship of User and JobOffers through UserOffer model */
db.users.belongsToMany(db.job_offers, { through: db.user_offer });
db.job_offers.belongsToMany(db.users, { through: db.user_offer });

db.users.hasMany(db.user_offer);
db.user_offer.belongsTo(db.users);
db.job_offers.hasMany(db.user_offer);
db.user_offer.belongsTo(db.job_offers);

/* One to many relationship of JobProviders and JobOffers */
db.job_providers.hasMany(db.job_offers, {
  foreignKey: { name: 'jobProviderId', allowNull: false },
});
db.job_offers.belongsTo(db.job_providers);

/* One to many relationship of JobAccount and JobOffers */
db.job_account.hasMany(db.job_offers, {
  foreignKey: { name: 'jobAccountEmailId', allowNull: false },
});
db.job_offers.belongsTo(db.job_account);

module.exports = db;
