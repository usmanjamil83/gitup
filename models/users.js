module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    name: {
      type: DataTypes.STRING,
     //  validate: {
     //   notNull: true,
     //   len: [2, 25]
     // }
   },
   age: {
     type: DataTypes.INTEGER,
     // validate: {
     //   len: [2],
     //   min: 18,
     //   max: 99,
     //   notNull: true
     // }
   },
   gender: {
     type: DataTypes.STRING,
     // validate: {
     //   notNull: true
     // }
   },
   quote: {
     type: DataTypes.STRING,
     defaultValue: "Let's git up!",
     // validate: {
     //   notNull: true,
     //   len: [2, 25]
     // }
   },
   image: {
    type: DataTypes.TEXT,
    // validate: {
    //   notNull: true
    // }
  },
  answer1: {
    type: DataTypes.STRING,
    // validate: {
    //   notNull: true
    // }
  },
  answer2: {
    type: DataTypes.STRING,
    // validate: {
    //   notNull: true
    // }
  },
  answer3: {
    type: DataTypes.STRING,
    // validate: {
    //   notNull: true
    // }
  },
  answer4: {
    type: DataTypes.STRING,
    // validate: {
    //   notNull: true
    // }
  },
  answer5: {
    type: DataTypes.STRING,
    // validate: {
    //   notNull: true
    // }
  },
  answer6: {
    type: DataTypes.STRING,
    // validate: {
    //   notNull: true
    // }
  },
  matchpoints: {
    type: DataTypes.INTEGER,
    // validate: {
    //   notNull: true
    // }
  }
});
  return User;
};