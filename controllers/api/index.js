const router = require('express').Router();
const questionRoutes = require('./questionRoutes');

router.use('/questions', questionRoutes);

module.exports = router;
