const router = require('express').Router();
const { Question, Answer } = require('../../models');

// Route to get all quiz questions
router.get('/', async (req, res) => {
  try {
    // Fetch all questions and their answers from the database
    const questionsData = await Question.findAll({
      include: [{ model: answer }],
    });
    // Serialize the data for the template
    const questions = questionsData.map((question) => question.get({ plain: true }));
    // Respond with the questions data

    res.render('quiz', {
      questions,
      loggedIn: req.session.loggedIn || false,
    });
    res.status(200).json(questions);
  } catch (err) {
    // Handle any errors
    res.status(500).json(err);
  }
});

// Route to submit quiz answers
router.post('/submit', async (req, res) => {
  try {
    // Extract user answers from the request body
    const userAnswers = req.body;
    // Fetch all questions and their answers from the database
    const questionsData = await Question.findAll({
      include: [{ model: answer }],
    });
    const questions = questionsData.map((question) => question.get({ plain: true }));

    // Initialize counters for correct and total answers
    let correctAnswers = 0;
    let totalQuestions = questions.length;

    // Check user answers against correct answers
    questions.forEach((question) => {
      const correctAnswer = question.answers.find((answer) => answer.isCorrect).text;
      if (userAnswers[`question-${question.id}`] === correctAnswer) {
        correctAnswers++;
      }
    });

    // Respond with the result
    res.status(200).json({ correct: correctAnswers, total: totalQuestions });
  } catch (err) {
    // Handle any errors
    res.status(500).json(err);
  }
});

module.exports = router;
