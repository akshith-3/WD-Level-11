/* eslint-disable no-unused-vars */
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class question extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static createQuestion({ electionId,ques,desc }) {
      let createQuestion = this.create({
        electionId,
        ques,
        desc
      });
      return createQuestion;
    }

    static async retriveQuestions(electionId) {
      let retriveQuestions = await this.findAll({
        where: {
          electionId,
        },
        order: [["id", "ASC"]],
      });
      return retriveQuestions;
    }

    static async retriveQuestion(id) {
      let retriveQuestion = await this.findOne({
        where: {
          id,
        },
        order: [["id", "ASC"]],
      });
      return retriveQuestion;
    }

    static editQuestion({ ques, desc, id }) {
      let editQuestion = this.update(
        {
          ques,
          desc,
        },
        {
          returning: true,
          where: {
            id,
          },
        }
      );
      return editQuestion;
    }

    static removeQuestion(id) {
      let removeQuestion = this.destroy({
        where: {
          id,
        },
      });
      return removeQuestion;
    }
    static associate(models) {
      // define association here
      question.belongsTo(models.election, {
        foreignKey: "electionId",
      });

      question.hasMany(models.options, {
        foreignKey: "questionId",
      });
    }
  }
  question.init({
    ques: DataTypes.STRING,
    desc: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'question',
  });
  return question;
};