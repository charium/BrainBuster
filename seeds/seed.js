const sequelize = require('../config/connection');
const { Question } = require('../models');
const questionData = require('./questionData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });
  await Question.bulkCreate(questionData);
  process.exit(0);
};
seedDatabase();