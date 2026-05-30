const coverLetterTailorer = require('../services/coverLetterTailorer');

class CoverLetterController {
  async tailorCoverLetter(req, res) {
    try {
      const { jobDescription } = req.body;

      if (!jobDescription || !jobDescription.trim()) {
        return res.status(400).json({
          error: 'Job description is required',
        });
      }

      // Get tailored cover letter
      const result = await coverLetterTailorer.tailorCoverLetter(
        jobDescription.trim()
      );

      // Return response to user
      res.json({
        coverLetter: result.response,
        responseTime: result.responseTime,
        tokensUsed: result.tokensUsed,
      });
    } catch (error) {
      console.error('Cover Letter Controller Error:', error);
      res.status(500).json({
        error: error.message || 'Something went wrong',
      });
    }
  }
}

module.exports = new CoverLetterController();
