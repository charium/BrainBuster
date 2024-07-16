const router = require('express').Router();
const { body, validationResult } = require('express-validator');
const { Question } = require('../../models');

// Middleware for input validation
const validateQuestion = [
  body('question').isString().notEmpty().withMessage('Question is required and must be a string.'),
  body('options').isArray({ min: 3 }).withMessage('Options must be an array with at least 3 items.'),
  body('correctAnswer').isString().notEmpty().withMessage('Correct answer is required and must be a string.'),
];

// GET /api/questions - Retrieve all questions
router.get('/', async (req, res) => {
  try {
    const questions = await Question.findAll();
    res.status(200).json(questions);
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve questions.' });
  }
});

// POST /api/questions - Add a new question
router.post('/', validateQuestion, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const newQuestion = await Question.create(req.body);
    res.status(201).json(newQuestion);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create new question.' });
  }
});

// GET /api/questions/:id - Retrieve a question by ID
router.get('/:id', async (req, res) => {
  try {
    const question = await Question.findByPk(req.params.id);
    if (!question) {
      res.status(404).json({ message: 'No question found with this id!' });
      return;
    }
    res.status(200).json(question);
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve question.' });
  }
});

// PUT /api/questions/:id - Update a question by ID
router.put('/:id', validateQuestion, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const updatedQuestion = await Question.update(req.body, {
      where: { id: req.params.id }
    });
    if (!updatedQuestion[0]) {
      res.status(404).json({ message: 'No question found with this id!' });
      return;
    }
    res.status(200).json({ message: 'Question updated successfully!' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update question.' });
  }
});

// DELETE /api/questions/:id - Delete a question by ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedQuestion = await Question.destroy({
      where: { id: req.params.id }
    });
    if (!deletedQuestion) {
      res.status(404).json({ message: 'No question found with this id!' });
      return;
    }
    res.status(200).json({ message: 'Question deleted successfully!' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete question.' });
  }
});

module.exports = router;
