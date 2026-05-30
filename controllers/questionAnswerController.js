const questionAnswerer = require('../services/questionAnswerer');
const { Questions } = require('../models');

class QuestionAnswerController {
  async answerQuestions(req, res) {
    try {
      const { company, jobDescription, questions } = req.body;

      if (!jobDescription || !jobDescription.trim()) {
        return res.status(400).json({
          error: 'Job description is required',
        });
      }

      if (!questions || !questions.trim()) {
        return res.status(400).json({
          error: 'Questions are required',
        });
      }

      // Get answers to questions
      const result = await questionAnswerer.answerQuestions(
        jobDescription.trim(),
        questions.trim()
      );

      // Return response to user
      res.json({
        answers: result.response,
        responseTime: result.responseTime,
        tokensUsed: result.tokensUsed,
      });

      Questions.create({
        question: questions.trim(),
        answer: result.response,
        company: company.trim(),
      });
    } catch (error) {
      console.error('Question Answer Controller Error:', error);
      res.status(500).json({
        error: error.message || 'Something went wrong',
      });
    }
  }
}

module.exports = new QuestionAnswerController();
