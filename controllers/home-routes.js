const router = require('express').Router();
const { Question, Answer } = require('../models');

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
router.get('/quiz', async (req, res) => {
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

// Login route
router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }
  res.render('login');
});

module.exports = router;
