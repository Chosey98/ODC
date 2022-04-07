import { Sequelize } from 'sequelize';
import setupModels from './models/setupModels';
const conn = new Sequelize({
	dialect: 'mysql',
	database: 'ODC',
	username: 'root',
	password: '',
	logging: false,
});
setupModels(conn);

export default conn;
