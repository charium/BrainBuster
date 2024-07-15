console.log('models/index.js')

const User = require('./user');
// const Quiz = require('./Quiz');
// const Question = require('/question');

// Quiz.hasMany(Question, {
//   foreignKey: 'Quiz_id',
// });

// Questions.belongsTo(Quiz, {
//   foreignKey: 'Quiz_id',
// });

// also export quiz and question
module.exports = { User };
