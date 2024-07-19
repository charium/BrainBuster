const User = require('./user');
const Question = require('./question');
const Answer = require('./answer');
const Score = require('./score');

// Define associations
User.hasMany(Score, {
  foreignKey: 'userId',
  onDelete: 'CASCADE',
});

Score.belongsTo(User, {
  foreignKey: 'userId',
});

Question.hasMany(Answer, {
  foreignKey: 'questionId',
  onDelete: 'CASCADE',
});

Answer.belongsTo(Question, {
  foreignKey: 'questionId',
});

module.exports = { User, Question, Answer, Score };
