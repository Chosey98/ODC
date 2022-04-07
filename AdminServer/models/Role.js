import { DataTypes } from 'sequelize';

export default (connection) => {
	connection.define(
		'Role',
		{
			id: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
			},
			role_name: {
				type: DataTypes.STRING(55),
				allowNull: false,
			},
		},
		{ timestamps: false }
	);
};
