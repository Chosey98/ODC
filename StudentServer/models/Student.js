import { DataTypes } from 'sequelize';

export default (connection) => {
	connection.define('Student', {
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		student_name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		email: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
		},
		passwordHash: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		student_phone: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		student_address: {
			type: DataTypes.STRING,
			allowNull: false,
		},
	});
};
