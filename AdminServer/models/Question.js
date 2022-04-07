import { DataTypes } from 'sequelize';

export default (connection) => {
	connection.define(
		'Question',
		{
			id: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
			},
			question: {
				type: DataTypes.STRING(255),
				allowNull: false,
			},
			question_mark: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
			isTask: {
				type: DataTypes.BOOLEAN,
				allowNull: false,
				defaultValue: false,
			},
			task_id: {
				type: DataTypes.INTEGER,
				defaultValue: null,
			},
			answer_1: {
				type: DataTypes.STRING(255),
			},
			answer_2: {
				type: DataTypes.STRING(255),
			},
			answer_3: {
				type: DataTypes.STRING(255),
			},
			answer_4: {
				type: DataTypes.STRING(255),
			},
			correct_answer: {
				type: DataTypes.STRING(255),
			},
			exam_id: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
		},
		{ timestamps: false }
	);
};

// add an option to upload a pdf file for a task
