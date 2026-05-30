const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());

app.use(require('morgan')('dev'));
app.use(require('cookie-parser')());
app.use(express.json({ limit: '25mb' }));
app.use(express.urlencoded({ limit: '25mb', extended: true }));
app.use(require('xss-clean')());
app.use(require('helmet')());
app.use('/api', require('./routes/mainRouter'));
app.use(require('./controllers/errorController.js'));

module.exports = app;
