import { DataTypes } from 'sequelize';

export default (connection) => {
	connection.define(
		'ExpiredToken',
		{
			id: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
			},
			token: {
				type: DataTypes.STRING(255),
				allowNull: false,
			},
			type: {
				type: DataTypes.STRING(255),
				allowNull: false,
			},
			eat: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
		},
		{ timestamps: true, updatedAt: false }
	);
};
