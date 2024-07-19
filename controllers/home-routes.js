const router = require('express').Router();
const { Question, Answer, Score, User } = require('../models');
const withAuth = require('../utils/auth'); // Middleware to check if the user is logged in

// Route to render the homepage
router.get('/', async (req, res) => {
  try {
    res.render('homepage', {
      loggedIn: req.session.loggedIn || false
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Route to render the quiz page
router.get('/quiz', withAuth, async (req, res) => {
  try {
    const questionsData = await Question.findAll({
      include: [{ model: Answer }]
    });
    const questions = questionsData.map((question) => question.get({ plain: true }));

    res.render('quiz', {
      questions,
      loggedIn: req.session.loggedIn || false
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Route to get user's scores
router.get('/scores', withAuth, async (req, res) => {
  try {
    const userId = req.session.user_id; // Get user ID from session

    const scoresData = await Score.findAll({
      where: {
        userId: userId,
      },
      include: [{ model: User }],
    });

    const scores = scoresData.map((score) => score.get({ plain: true }));

    res.render('scores', {
      scores,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.error('Error fetching user scores:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Login route
router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }
  res.render('login');
});

module.exports = router;
