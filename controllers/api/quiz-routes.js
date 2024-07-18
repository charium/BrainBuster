const router = require('express').Router();
const { Question, Answer } = require('../../models');

// Route to get all quiz questions
router.get('/', async (req, res) => {
  try {
    const questionsData = await Question.findAll({
      include: [{ model: Answer }],
    });
    const questions = questionsData.map((question) => question.get({ plain: true }));

    res.render('quiz', {
      questions,
      loggedIn: req.session.loggedIn || false,
    });
    res.status(200).json(questions);
  } catch (err) {
    console.error('Error fetching quiz questions:', err);
    res.status(500).json(err);
  }
});

// Route to submit quiz answers
router.post('/submit', async (req, res) => {
  try {
    const userAnswers = req.body;
    console.log('User Answers:', userAnswers);

    const questionsData = await Question.findAll();
    const questions = questionsData.map((question) => question.get({ plain: true }));
    console.log('Questions Data:', questions);

    let correctAnswers = 0;
    const totalQuestions = questions.length;

    questions.forEach((question) => {
      const correctAnswer = question.correctAnswer;
      const userAnswer = userAnswers[`question-${question.id}`];
      console.log(`Question ID: ${question.id}, Correct Answer: ${correctAnswer}, User Answer: ${userAnswer}`);
      if (userAnswer === correctAnswer) {
        correctAnswers++;
      }
    });

    res.status(200).json({ correct: correctAnswers, total: totalQuestions });
  } catch (err) {
    console.error('Error submitting quiz:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
