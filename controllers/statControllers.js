const { Op } = require('sequelize');
const models = require('../models');
const { Stats } = require('../models');
const { Chats } = require('../models');

exports.getAllStats = async (req, res) => {
  try {
    const sixtyDaysAgo = new Date();
    sixtyDaysAgo.setDate(sixtyDaysAgo.getDate() - 60);

    const summary = (
      await models.sequelize.query(
        `
        SELECT count(id) as visits, sum(spent_minutes) as minutes, count(distinct country) as countries, count(distinct ip) as ips 
        FROM stats;
      `,
        { type: models.sequelize.QueryTypes.SELECT }
      )
    )[0];

    const dailyStats = await models.sequelize.query(
      `
        SELECT date, count(id) as visits, sum(spent_minutes) as minutes FROM stats
        WHERE date BETWEEN (CURRENT_DATE - INTERVAL '50 days') AND CURRENT_DATE
        GROUP BY date
        ORDER BY date;
      `,
      { type: models.sequelize.QueryTypes.SELECT }
    );

    const countryStats = await models.sequelize.query(
      `
        SELECT country, count(id) as visits, sum(spent_minutes) as minutes FROM stats
        GROUP BY country;
      `,
      { type: models.sequelize.QueryTypes.SELECT }
    );

    const longestVisitsAtOnce = (
      await models.sequelize.query(
        `
        SELECT ip, location, spent_minutes as minutes, date
        FROM stats
        ORDER BY spent_minutes DESC
        LIMIT 10;
      `
      )
    )[0];

    const topVisitsByTotalVisitCount = (
      await models.sequelize.query(
        `
        SELECT ip, location, count(id) as visits
        FROM stats
        GROUP BY ip, location
        ORDER BY visits DESC
        LIMIT 10;
      `
      )
    )[0];

    const topVisitsByTotalTime = (
      await models.sequelize.query(
        `
        SELECT ip, location, sum(spent_minutes) as minutes
        FROM stats
        GROUP BY ip, location
        ORDER BY minutes DESC
        LIMIT 10;
      `
      )
    )[0];

    const recentVisits = (
      await models.sequelize.query(
        `
        SELECT ip, location, spent_minutes as minutes, date, device, updated_at as created_at
        FROM stats
        ORDER BY updated_at DESC, id DESC
        LIMIT 500;
      `
      )
    )[0];

    res.json({
      summary,
      dailyStats,
      countryStats,
      longestVisitsAtOnce,
      topVisitsByTotalVisitCount,
      topVisitsByTotalTime,
      recentVisits,
    });
  } catch (error) {
    console.error('Error getting stats:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getAllVisits = async (req, res) => {
  try {
    const visits = await Stats.findAll({
      order: [['id', 'DESC']],
      limit: 500,
    });

    res.json(visits);
  } catch (error) {
    console.error('Error getting visits:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.deleteVisit = async (req, res) => {
  try {
    await Stats.destroy({
      where: {
        location: [
          'North Holland, The Netherlands',
          'Des Moines, Iowa, United States',
          'Boydton, Virginia, United States',
          'Frankfurt am Main, Hesse, Germany',
          'Zaandam, North Holland, The Netherlands',
        ],
      },
    });
    await Chats.destroy({
      where: {
        location: [
          'North Holland, The Netherlands',
          'Des Moines, Iowa, United States',
          'Boydton, Virginia, United States',
          'Frankfurt am Main, Hesse, Germany',
          'Zaandam, North Holland, The Netherlands',
        ],
      },
    });
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting visit:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.deleteVisitByIp = async (req, res) => {
  try {
    const { ip } = req.params;

    await Stats.destroy({ where: { ip } });

    res.status(200).send();
  } catch (error) {
    console.error('Error deleting visit by ip:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
