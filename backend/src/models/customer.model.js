"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Customer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Customer.hasMany(models.Address, {
        foreignKey: "customerId",
        as: "addresses",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
      Customer.hasMany(models.Contact, {
        foreignKey: "customerId",
        as: "contacts",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
      Customer.hasOne(models.Log, {
        foreignKey: "customerId",
        as: "logs",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
    }
  }
  Customer.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      phoneNumber: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Customer",
      tableName: "customers",
      timestamps: true,
    }
  );
  return Customer;
};
