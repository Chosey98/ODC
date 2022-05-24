import { DataTypes } from 'sequelize';

export default (connection) => {
	connection.define(
		'Course',
		{
			id: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
			},
			category_id: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
			course_name: {
				type: DataTypes.STRING(200),
				allowNull: false,
			},
			course_level: {
				type: DataTypes.STRING(255),
				allowNull: false,
			},
			admin_id: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
			enrollable: {
				type: DataTypes.INTEGER,
				allowNull: false,
				defaultValue: true,
			},
			entryExamId: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
			exam1: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
			exam2: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
			exam3: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
			finalProject: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
			image_url: {
				types: DataTypes.STRING(255),
				allowNull: false,
			},
		},
		{ timestamps: true, updatedAt: false }
	);
};

// Add description
// Add Instructor
