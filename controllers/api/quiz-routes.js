const router = require('express').Router();
const { Question, Answer, Score } = require('../../models'); // Ensure Score is imported
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
  } catch (err) {
    console.error('Error fetching quiz questions:', err);
    res.status(500).json(err);
  }
});

// Route to submit quiz answers
router.post('/submit', withAuth, async (req, res) => {
  try {
    const userAnswers = req.body;  // Form data
    const userId = req.session.user_id;  // Get user ID from session

    // Fetch all questions
    const questionsData = await Question.findAll();
    const questions = questionsData.map((question) => question.get({ plain: true }));

    let correctAnswers = 0;
    const totalQuestions = questions.length;

    // Calculate score
    questions.forEach((question) => {
      const correctAnswer = question.correctAnswer;  // Correct answer from DB
      const userAnswer = userAnswers[`question-${question.id}`];  // User answer from form data
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

    // Send JSON response with the score
    res.status(200).json({ correct: correctAnswers, total: totalQuestions });
  } catch (err) {
    console.error('Error submitting quiz:', err);
    res.status(500).json({ error: 'Internal Server Error', details: err.message });
  }
});

module.exports = router;
