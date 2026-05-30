const { Applications } = require('../models');

const parseSubmittedAt = (value) => {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
};

class ApplicationsController {
  async createApplication(req, res) {
    try {
      const { company, position, salary, submittedAt, url } = req.body;

      console.log(req.body);

      if (!company?.trim()) {
        return res.status(400).json({ error: 'Company is required' });
      }

      if (!position?.trim()) {
        return res.status(400).json({ error: 'Position is required' });
      }

      if (salary === undefined || salary === null) {
        return res.status(400).json({ error: 'Salary is required' });
      }

      if (!submittedAt) {
        return res.status(400).json({ error: 'Submitted date is required' });
      }

      const parsedSubmittedAt = parseSubmittedAt(submittedAt);
      if (!parsedSubmittedAt) {
        return res.status(400).json({ error: 'Invalid submitted date' });
      }

      if (url === undefined || url === null) {
        return res.status(400).json({ error: 'URL is required' });
      }

      const record = await Applications.create({
        company: company.trim(),
        position: position.trim(),
        salary: String(salary).trim(),
        submittedAt: parsedSubmittedAt,
        url: String(url).trim(),
      });

      res.status(201).json(record);
    } catch (error) {
      console.error('Error creating application:', error);
      res.status(500).json({
        error: error.message || 'Something went wrong',
      });
    }
  }

  async getApplications(req, res) {
    try {
      const totalCount = await Applications.count();

      const applications = await Applications.findAll({
        order: [['submittedAt', 'DESC']],
      });

      res.json({ totalCount, applications });
    } catch (error) {
      console.error('Error getting applications:', error);
      res.status(500).json({
        error: error.message || 'Something went wrong',
      });
    }
  }
}

module.exports = new ApplicationsController();
