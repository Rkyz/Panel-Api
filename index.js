require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const findFreePort = require('find-free-port');
const db = require('./models'); // Sequelize models
const router = require('./routes'); // Main router

const app = express();
const defaultPort = parseInt(process.env.PORT, 10) || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(router);

findFreePort(defaultPort, (err, freePort) => {
  if (err) {
    console.error('Error finding a free port:', err);
    return;
  }

  db.sequelize.sync().then(() => {
    app.listen(freePort, () => {
      console.log(`Server is running on http://localhost:${freePort}`);
    });
  }).catch(error => {
    console.error('Unable to connect to the database:', error);
  });
});
