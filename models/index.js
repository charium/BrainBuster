const User = require('./user');
const Question = require('./question');
const Answer = require('./answer');

// Define associations
Question.hasMany(Answer, {
  foreignKey: 'questionId',
  onDelete: 'CASCADE',
});

Answer.belongsTo(Question, {
  foreignKey: 'questionId',
});

module.exports = { User, Question, Answer };
