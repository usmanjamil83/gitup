module.exports = function(sequelize, DataTypes) {
  var Github = sequelize.define("Github", {
    name: {
      type: DataTypes.STRING,
    }
  });
  return Github;
};