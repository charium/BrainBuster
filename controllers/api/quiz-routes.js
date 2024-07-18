const router = require('express').Router();
const { Question, Answer, Response } = require('../../models');

// Route to submit quiz answers
router.post('/submit', async (req, res) => {
  try {
    const userAnswers = req.body;
    const questionsData = await Question.findAll({
      include: [{ model: Answer }]
    });
    const questions = questionsData.map((question) => question.get({ plain: true }));
    
    let correctAnswers = 0;
    const totalQuestions = questions.length;
    
    for (const question of questions) {
      const correctAnswer = question.answers.find((answer) => answer.isCorrect).text;
      const userAnswer = userAnswers[`question-${question.id}`];
      
      // Save user response
      await Response.create({
        questionId: question.id,
        answer: userAnswer
      });
      
      if (userAnswer === correctAnswer) {
        correctAnswers++;
      }
    }
    
    res.status(200).json({ correct: correctAnswers, total: totalQuestions });
  } catch (err) {
    console.error('Error submitting quiz:', err);
    res.status(500).json(err);
  }
});

module.exports = router;
