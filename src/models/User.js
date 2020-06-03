/* eslint-disable no-param-reassign */
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
        beforeCreate(user) {
          user.name = user.name.trim().toLowerCase();
          user.email = user.email.trim().toLowerCase();
          return user;
        },
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
