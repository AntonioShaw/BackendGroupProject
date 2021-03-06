'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ShoeTable extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.ShoeTable.belongsTo(models.User, {as: 'user', foreignKey: 'user_id'})
      models.ShoeTable.hasMany(models.Comment, {as: 'comment', foreignKey: 'shoe_id'})
    }
  };
  ShoeTable.init({
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    size: DataTypes.STRING,
    style: DataTypes.STRING,
    price: DataTypes.STRING,
    image: DataTypes.BLOB
  }, {
    sequelize,
    modelName: 'ShoeTable',
  });
  return ShoeTable;
};