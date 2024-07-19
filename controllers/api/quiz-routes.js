const router = require('express').Router();
const { Question, Answer } = require('../../models');
const withAuth = require('../../utils/auth');
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
router.post('/submit', withAuth, async (req, res) => {
  try {
    const userAnswers = req.body;
    const userId = req.session.user_id; // Get user ID from session

    const questionsData = await Question.findAll();
    const questions = questionsData.map((question) => question.get({ plain: true }));

    let correctAnswers = 0;
    const totalQuestions = questions.length;

    questions.forEach((question) => {
      const correctAnswer = question.correctAnswer;
      const userAnswer = userAnswers[`question-${question.id}`];
      if (userAnswer === correctAnswer) {
        correctAnswers++;
      }
    });

    // Save the user's score
    await Score.create({
      userId: userId,
      score: correctAnswers,
      total: totalQuestions,
    });

    res.status(200).json({ correct: correctAnswers, total: totalQuestions });
  } catch (err) {
    console.error('Error submitting quiz:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


module.exports = router;
