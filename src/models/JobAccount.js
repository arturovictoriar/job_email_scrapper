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
