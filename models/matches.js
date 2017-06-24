module.exports = function(sequelize, DataTypes) {
  var Match = sequelize.define("Match", {
    name: {
      type: DataTypes.STRING,
      validate: {
        isAlpha: true,
        notNull: true,
        //do we need this as well?
        notEmpty: true,
        len: [2, 25]
      }
    },
    match: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  });
  return Match;
};