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
