import { DataTypes, literal } from 'sequelize';

export default (connection) => {
	connection.define(
		'UserExam',
		{
			id: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
			},
			revision_id: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
			exam_code: {
				type: DataTypes.STRING(255),
				allowNull: false,
			},
			exam_questions: {
				type: DataTypes.STRING(255),
				allowNull: false,
			},
			exam_answers: {
				type: DataTypes.STRING(255),
				allowNull: false,
			},
			exam_taken: {
				type: DataTypes.BOOLEAN,
				allowNull: false,
				defaultValue: false,
			},
			expired: {
				type: DataTypes.BOOLEAN,
				allowNull: false,
				defaultValue: false,
			},
			eat: {
				type: DataTypes.STRING,
				allowNull: false,
			},
		},
		{ timestamps: true, updatedAt: false }
	);
};
