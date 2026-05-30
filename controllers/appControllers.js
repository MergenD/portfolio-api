const models = require('../models');
const { Op } = require('sequelize');

exports.createApp = async (req, res) => {
  const { date, applied, rejected, interview, offer } = req.body;
  const app = await models.Apps.create({
    date,
    applied,
    rejected,
    interview,
    offer,
  });

  res.json(app);
};

exports.updateApp = async (req, res) => {
  const { id, applied, rejected, interview, offer } = req.body;
  const app = await models.Apps.findByPk(id);
  if (!app) {
    return res.status(404).json({ error: 'App not found' });
  }
  app.applied = applied;
  app.rejected = rejected;
  app.interview = interview;
  app.offer = offer;
  await app.save();
  res.json(app);
};

exports.getAllApps = async (req, res) => {
  const { month, year } = req.params;
  try {
    const total = (
      await models.sequelize.query(
        `
        SELECT sum(applied) as applied, sum(rejected) as rejected, sum(interview) as interview, sum(offer) as offer
        FROM apps;
      `,
        { type: models.sequelize.QueryTypes.SELECT }
      )
    )[0];

    const monthly = (
      await models.sequelize.query(
        `
        SELECT sum(applied) as applied, sum(rejected) as rejected, sum(interview) as interview, sum(offer) as offer
        FROM apps
        WHERE EXTRACT(YEAR FROM date) = ${year} AND EXTRACT(MONTH FROM date) = ${month};
      `,
        { type: models.sequelize.QueryTypes.SELECT }
      )
    )[0];

    res.json({ total, monthly });
  } catch (error) {
    console.error('Error getting apps:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getAppsMonthly = async (req, res) => {
  const { month, year } = req.params;
  try {
    const apps = await models.Apps.findAll({
      where: {
        date: {
          [Op.between]: [
            new Date(year, month - 1, 1),
            new Date(year, month, 0),
          ],
        },
      },
    });

    res.json(apps);
  } catch (error) {
    console.error('Error getting monthly apps:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
