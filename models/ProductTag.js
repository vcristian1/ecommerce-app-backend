// import important parts of sequelize library
const { Model, DataTypes } = require('sequelize');
// import our database connection from config.js
const sequelize = require('../config/connection');
// Initialize ProductTag model (table) by extending off Sequelize's Model class
class ProductTag extends Model {}

const Tag = require('./Category');
const Product = require('./Category');


// set up fields and rules for ProductTag model

ProductTag.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    product_id: {
      type: DataTypes.INTEGER,
      //  References the Category Models ID.
      references: {
        model: Product,
        key: 'id'
      }
    },
    tag_id: {
      type: DataTypes.INTEGER,
      //  References the Category Models ID.
      references: {
        model: Tag,
        key: 'id'
      }
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'product_tag',
  }
);

module.exports = ProductTag;
