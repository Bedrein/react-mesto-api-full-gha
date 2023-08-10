require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const helmet = require('helmet');
const cors = require('cors');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const router = require('./routes');
const errorHandler = require('./middlewares/errorHandler');
const { PORT, MONGO_DB } = require('./utils/constants');

mongoose.connect(MONGO_DB);

const app = express();

app.use(cors({ origin: ['httpscd://bedrein.nomoreparties.co'] }));

app.use(helmet());

app.use(requestLogger);

app.use(bodyParser.json());

app.use(router);

app.use(errorLogger);

app.use(errors());

app.use(errorHandler);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Add listening on port ${PORT}`);
});
