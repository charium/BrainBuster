const router = require('express').Router();
const { User } = require('../../models');
const withAuth = require('../../utils/auth');
// CREATE new user
console.log(User);
console.log("conncted to user-routes.js");

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

router.post('/', async (req, res) => {
  try {
    console.log('req.body', req.body);  
    const dbUserData = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });

    req.session.save(() => {
      req.session.loggedIn = true;
      console.log("account created")
      res.status(200).json(dbUserData);
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const dbUserData = await User.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (!dbUserData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password. Please try again!' });
      return;
    }

    const validPassword = await dbUserData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password. Please try again!' });
      return;
    }

    req.session.save(() => {
      req.session.loggedIn = true;

      res
        .status(200)
        .json({ user: dbUserData, message: 'You are now logged in!' });
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Logout
router.post('/logout', (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
