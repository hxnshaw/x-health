"use strict";
const { Model } = require("sequelize");
const bcrypt = require("bcrypt");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init(
    {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          min: 1,
        },
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate: {
          isEmail: { message: "ENTER A VALID EMAIL ADDRESS" },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          min: 8,
        },
      },
      role: {
        type: DataTypes.ENUM("clerk", "nurse"),
      },
    },
    {
      sequelize,
      modelName: "User",
    }
  );

  User.addHook("beforeSave", async function (user) {
    // const user = this;
    if (!user.changed("password")) return;
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hashSync(user.password, salt);
  });

  User.addHook(
    "beforeCreate",
    async (user) => (user.username = user.username.toLowerCase())
  );
  User.prototype.comparePassword = async function (userPassword) {
    const isMatch = await bcrypt.compare(userPassword, this.password);
    return isMatch;
  };
  return User;
};
