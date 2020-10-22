const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");
const bcrypt = require("bcrypt");

// creates user model
class User extends Model {
  // adds an instance method to compare passwords
  checkPassword(loginPw) {
    return bcrypt.compareSync(loginPw, this.password);
  }
}

// two paramters. One containing all column objects, the other contains database params
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
    hooks: {
      // sets up beforeCreate lifestyle "hook" functionality
      // declare function as async before being able to use await
      async beforeCreate(newUserData) {
        newUserData.password = await bcrypt.hash(newUserData.password, 10);
        return newUserData;
      },

      async beforeUpdate(updatedUserData) {
        updatedUserData.password = await bcrypt.hash(
          updatedUserData.password,
          10
        );
        return updatedUserData;
      },
    },
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "user",
  }
);

module.exports = User;
