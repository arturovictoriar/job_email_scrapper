/**
 * User model
 * @date 2020-06-22
 * @param {Object} sequelize
 * @param {Object} DataTypes
 * @returns {Object}
 */
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'user',
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
      },
    },
    {
      hooks: {
        beforeBulkCreate(users) {
          for (const user of users) {
            user.name = user.name.trim().toLowerCase();
            user.email = user.email.trim().toLowerCase();
          }
          return users;
        },
      },
    }
  );

  return User;
};
