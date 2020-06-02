module.exports = (sequelize, DataTypes) => {
  const UserOffer = sequelize.define('user_offer', {
    emailSentAt: {
      type: DataTypes.DATE,
      defaultValue: null,
      allowNull: true,
    },
  });
  return UserOffer;
};
