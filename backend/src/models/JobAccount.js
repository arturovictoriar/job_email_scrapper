/**
 * Job Account model
 * @date 2020-06-22
 * @param {Object} sequelize
 * @param {Object} DataTypes
 * @returns {Object}
 */
module.exports = (sequelize, DataTypes) => {
  const JobAccount = sequelize.define('job_account', {
    emailId: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
  });
  return JobAccount;
};
