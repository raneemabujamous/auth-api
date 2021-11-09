"use strict";

const userModel = require("./users.js");
const { Sequelize, DataTypes } = require("sequelize");

const DATABASE_URL =
  process.env.NODE_ENV === "test" ? "sqlite:memory:" : process.env.DATABASE_URL;

// const sequelize = new Sequelize(DATABASE_URL);
const sequelize = new Sequelize("lab8", "raneemabujamous", "raneem1976", {
  host: "localhost",
  dialect: "postgres",
});
const clothesModel = require("./clothes/model.js");
const foodModel = require("./food/model.js");
const Collection = require("./data-collection.js");

module.exports = {
  db: sequelize,
  users: userModel(sequelize, DataTypes),
  food: new Collection(foodModel),
  clothes: new Collection(clothesModel),
};
