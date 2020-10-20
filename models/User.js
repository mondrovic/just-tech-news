const { Model, DataTypes, STRING } = require("sequelize");
const sequelize = require("../config/connection");

// creates user model
class User extends Model {}

User.init(
  {
    // define id column type uses imported datatypes and defines integer. Cannot be null. Is primary key. AI on
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // makes sure all entries are unique and email is in a valid format
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      // minimum pass length
      validate: {
        len: [4],
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "user",
  }
);

module.exports = User;
