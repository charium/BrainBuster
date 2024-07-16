const sequelize = require('../config/connection');
const { Question } = require('../models');

const questionData = [
  {
    question: "In the film Avatar: The Way of Water, what was Jake Sully's youngest son's name?",
    options: ["Lo'Ak", "Tuk", "Spider"],
    correctAnswer: "Lo'Ak"
  },
  {
    question: "In the movie 'Holes' Stanley Yelnats meets his mentor named Theodore, also known as...?",
    options: ["X-Ray", "Magnet", "Armpit"],
    correctAnswer: "Armpit"
  },
  {
    question: "In which film does Leonardo DiCaprio travel with Djimon Honshu through Sierra Leone?",
    options: ["Blood Diamond", "Django Unchained", "Body of Lies"],
    correctAnswer: "Blood Diamond"
  },
  {
    question: "Who was the voice of the villain, President Business, in the Lego Movie?",
    options: ["Sebastian Maniscalco", "Morgan Freeman", "Will Ferrell"],
    correctAnswer: "Will Ferrell"
  },
  {
    question: "What was the name of Matthew Mcconaughey's AI companion in Interstellar?",
    options: ["LARS", "SAMS", "TARS"],
    correctAnswer: "TARS"
  },
  {
    question: "How many times had Ferris Beuller ALLEGEDLY been absent in Ferris Beuller's Day Off?",
    options: ["10", "9", "5"],
    correctAnswer: "9"
  },
  {
    question: "Which Stephen King adaptation is known for this quote: 'You'll float too!'",
    options: ["Pet Semetary", "It", "The Shining"],
    correctAnswer: "It"
  },
  {
    question: "Which film was the first R rated film featuring Wolverine?",
    options: ["X-Men: Wolverine", "Deadpool x Wolverine", "Logan"],
    correctAnswer: "Logan"
  },
  {
    question: "Which of these Romeo & Juliet stories was released in 1961?",
    options: ["Romeo + Juliet", "West Side Story", "Shakespeare in Love"],
    correctAnswer: "West Side Story"
  },
  {
    question: "What is the name of Ricky Bobby's racing teammate in Talladega Knights?",
    options: ["Kyle Naughton, Jr.", "Cal Naughton, Jr.", "John C. Reilly"],
    correctAnswer: "Cal Naughton, Jr."
  }
];

const seedDatabase = async () => {
  await sequelize.sync({ force: true });
  await Question.bulkCreate(questionData);
  process.exit(0);
};

seedDatabase();
