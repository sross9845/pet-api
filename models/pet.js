'use strict';
module.exports = (sequelize, DataTypes) => {
  const pet = sequelize.define('pet', {
    name: DataTypes.STRING,
    type: DataTypes.STRING,
    age: DataTypes.INTEGER
  }, {});
  pet.associate = function(models) {
    // associations can be defined here
  };
  return pet;
};