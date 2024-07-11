console.log('models/index.js')

const User = require('/User');
const Quiz = require('/Quiz');
const Question = require('/Question');

Quiz.hasMany(Question, {
  foreignKey: 'Quiz_id',
});

Questions.belongsTo(Quiz, {
  foreignKey: 'Quiz_id',
});

module.exports = { User, Quiz, Question };
