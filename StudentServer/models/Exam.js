import { DataTypes } from 'sequelize';

export default (connection) => {
	connection.define(
		'Exam',
		{
			id: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
			},
			course_id: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
			number_of_questions: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
		},
		{ timestamps: true, updatedAt: false }
	);
};
