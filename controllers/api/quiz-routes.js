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

router.post('/submit', async (req, res) => {
  try {
    const userAnswers = req.body;
    console.log('User Answers:', userAnswers);

    const questionsData = await Question.findAll({
      include: [{ model: Answer }],
    });
    const questions = questionsData.map((question) => question.get({ plain: true }));
    console.log('Questions Data:', questions);

    let correctAnswers = 0;
    const totalQuestions = questions.length;

    questions.forEach((question) => {
      if (question.answers.length > 0) {
        const correctAnswer = question.answers.find((answer) => answer.isCorrect).text;
        if (userAnswers[`question-${question.id}`] === correctAnswer) {
          correctAnswers++;
        }
      } else {
        console.warn(`No answers found for question ID: ${question.id}`);
      }
    });

    res.status(200).json({ correct: correctAnswers, total: totalQuestions });
  } catch (err) {
    console.error('Error submitting quiz:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
