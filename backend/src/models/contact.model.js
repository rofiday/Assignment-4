const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Contact extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Contact.belongsTo(models.Customer, {
        foreignKey: "customerId",
        as: "customer",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
    }
  }

  Contact.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      customerId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      contactType: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      contactValue: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Contact",
      tableName: "contacts",
      timestamps: true,
    }
  );

  return Contact;
};
