const path = require('path');
require('dotenv').config({
  path: path.join(__dirname, 'config', 'config.env'),
});
const { sequelize } = require('./models');

// Increase max listeners to avoid warnings
process.setMaxListeners(20);

const app = require('./app.js');
const http = require('http').createServer(app);

http.listen(process.env.PORT, async () => {
  await sequelize.authenticate();

  console.log(
    `Connected to DB and listening on port  ${process.env.PORT} - ${process.env.NODE_ENV}...`
  );
});

process.on('unhandledRejection', (err) => {
  console.log(err.name, err.message);
  http.close(() => {
    process.exit();
  });
});
