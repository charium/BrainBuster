const router = require('express').Router();

const quizRoutes = require('./api');
const homeRoutes = require('./home-routes.js');

router.use('/', homeRoutes);
router.use('/quiz', quizRoutes);

module.exports = router;
