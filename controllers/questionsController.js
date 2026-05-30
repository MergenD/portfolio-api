const { Questions } = require('../models');

class QuestionsController {
  async getQuestions(req, res) {
    try {
      const offset = parseInt(req.query.offset) || 0;

      const totalCount = await Questions.count();

      const questions = await Questions.findAll({
        order: [['id', 'DESC']],
        limit: 20,
        offset: offset,
      });

      res.json({ totalCount, questions });
    } catch (error) {
      console.error('Error getting chat history:', error);
      res.status(500).json({
        error: error.message || 'Something went wrong',
      });
    }
  }
}

module.exports = new QuestionsController();
