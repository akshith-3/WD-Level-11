/* eslint-disable no-unused-vars */
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class election extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    // eslint-disable-next-line no-unused-vars
    static createElection({ electionName, publicUrl,adminID }) {
      let createElection = this.create({
        electionName,
        publicUrl,
        adminID,
      });
      return createElection;
    }

    static retriveElections(adminID) {
      let retriveElections = this.findAll({
        where: {
          adminID,
        },
        order: [["id", "ASC"]],
      });
      return retriveElections;
    }

    static retriveElection(id) {
      let retriveElection = this.findOne({
        where: {
          id,
        },
      });
      return retriveElection;
    }

    static associate(models) {
      // define association here
      election.belongsTo(models.admin, {
        foreignKey: "adminID",
      });

      election.hasMany(models.question, {
        foreignKey: "electionId",
      });
    }
  }
  election.init({
    electionName: DataTypes.STRING,
    launched: DataTypes.STRING,
    ended: DataTypes.STRING,
    publicUrl: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'election',
  });
  return election;
};