"use strict";
const { Model } = require("sequelize");
const validator = require("validator");

module.exports = (sequelize, DataTypes) => {
  class Patient extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Patient.init(
    {
      first_name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          min: 1,
        },
      },
      middle_name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          min: 1,
        },
      },
      last_name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          min: 1,
        },
      },
      gender: {
        type: DataTypes.ENUM("male", "female"),
        allowNull: false,
      },
      birthDate: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          validator: validator.isDate,
          message: "PLEASE ENTER A VALID DATE",
        },
      },
      telephone_number: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          is: [/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im],
        },
      },
      patient_id: {
        type: DataTypes.INTEGER,
        defaultValue: function () {
          return Math.floor(Math.random() * 900000) + 100000;
        },
      },
      payment_category: {
        type: DataTypes.ENUM("out of pocket", "reliance health insurance"),
      },
    },
    {
      sequelize,
      modelName: "Patient",
    }
  );

  Patient.addHook(
    "beforeCreate",
    async (patient) => (
      (patient.last_name = patient.last_name.toLowerCase()),
      (patient.middle_name = patient.middle_name.toLowerCase()),
      (patient.first_name = patient.first_name.toLowerCase())
    )
  );

  return Patient;
};
