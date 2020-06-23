/**
 * Job Provider model
 * @date 2020-06-22
 * @param {Object} sequelize
 * @param {Object} DataTypes
 * @returns {Object}
 */
module.exports = (sequelize, DataTypes) => {
  const JobProvider = sequelize.define('job_provider', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  });
  return JobProvider;
};
