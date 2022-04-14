const authMiddleware = require('./auth');
const bodyParser = require('body-parser');

const setupMiddleware = (app) => {
  app.use(bodyParser.json());
  authMiddleware.init();
};

exports.setupMiddleware = setupMiddleware;
