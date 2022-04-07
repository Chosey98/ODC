import { DataTypes } from 'sequelize';

export default (connection) => {
	connection.define(
		'Enroll',
		{
			id: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
			},
			student_id: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
			course_id: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
			status: {
				type: DataTypes.STRING,
				allowNull: false,
				defaultValue: 'pending',
			},
		},
		{ timestamps: true, updatedAt: false }
	);
};
