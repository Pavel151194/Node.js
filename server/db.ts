import { Sequelize } from 'sequelize';

// TODO: use env

export default new Sequelize('node_js', 'postgres', '', {
  dialect: 'postgres',
  host: 'localhost',
  port: 5432,
});
