import { DataTypes } from 'sequelize';

export default (connection) => {
	connection.define(
		'Task',
		{
			id: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
			},
			task_url: {
				type: DataTypes.STRING(255),
				allowNull: false,
			},
		},
		{ timestamps: true, updatedAt: false }
	);
};
