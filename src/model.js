const Sequelize = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite3'
});

class Level extends Sequelize.Model {}
Level.init(
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    deviceId: {
      type: Sequelize.UUID,
      allowNull: false
    },
    rssiLevel: {
      type: Sequelize.INTEGER,
      allowNull: false
    }
  },
  {
    sequelize,
    indexes: [
      {
        unique: true,
        fields: ['deviceId'],
      },
    ],
    timestamps: true,
    createdAt: false,
    updatedAt: true,
    modelName: 'Level'
  }
);

module.exports = {
  sequelize,
  Level
};
