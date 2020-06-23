/**
 * UserOffer model
 * @date 2020-06-22
 * @param {Object} sequelize
 * @param {Object} DataTypes
 * @returns {Object}
 */
module.exports = (sequelize, DataTypes) => {
  const UserOffer = sequelize.define('user_offer', {
    emailSentAt: {
      type: DataTypes.DATE,
      defaultValue: null,
      allowNull: true,
    },
    company: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  return UserOffer;
};
