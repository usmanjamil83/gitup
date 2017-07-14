module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [2, 25]
      }
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        len: [2],
        min: 18,
        max: 99,
      }
    },
    gender: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    targetGender: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    quote: {
      type: DataTypes.STRING,
      defaultValue: "Let's git up!",
    },
    image: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    answer1: {
      type: DataTypes.STRING,
      // allowNull: false,
    },
    answer2: {
      type: DataTypes.STRING,
      // allowNull: false,
    },
    answer3: {
      type: DataTypes.STRING,
      // allowNull: false,
    },
    answer4: {
      type: DataTypes.STRING,
      // allowNull: false,
    },
    answer5: {
      type: DataTypes.STRING,
      // allowNull: false,
    },
    answer6: {
      type: DataTypes.STRING,
      // allowNull: false,
    },
    matchpoints: {
      type: DataTypes.INTEGER,
      // allowNull: false,
    }
  });
  return User;
};