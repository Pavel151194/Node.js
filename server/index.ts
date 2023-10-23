import cors from 'cors';
import express from 'express';
import fileUpload from 'express-fileupload';
import env from 'dotenv';
import path, { resolve as getDirName } from 'path';
import sequelize from './db.js';
import router from './routes/index.js';
import errorHandler from './middleware/errorHandler.js';

env.config();

const PORT = process.env.PORT || 5000;

const server = express();

server.use(cors());
server.use(express.json());
server.use(express.static(path.resolve(getDirName(), '..', 'static')));
server.use(fileUpload({}));
server.use('/api', router);
server.use(errorHandler);

const init = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    server.listen(PORT, () => {
      console.log(`server started on port ${PORT}`);
    });
  } catch (e) {
    console.log(e);
  }
};

init();
