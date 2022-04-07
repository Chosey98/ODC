import { DataTypes } from 'sequelize';
// Ask if student_degree is the same as total_right_degree and why store total wrong degree

export default (connection) => {
	connection.define(
		'Revision',
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
			exam_id: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
			student_degree: {
				type: DataTypes.FLOAT,
			},
			enroll_id: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
			reviewed: {
				type: DataTypes.BOOLEAN,
				defaultValue: false,
			},
		},
		{ timestamps: true, updatedAt: false }
	);
};
