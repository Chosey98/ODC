import { DataTypes } from 'sequelize';

export default (connection) => {
	connection.define('ResetToken', {
		userId: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			allowNull: false,
		},
		resetToken: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		resetTokenExpiry: {
			type: DataTypes.STRING,
			allowNull: false,
		},
	});
};
