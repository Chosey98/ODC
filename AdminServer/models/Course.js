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
		},
		{ timestamps: true, updatedAt: false }
	);
};
