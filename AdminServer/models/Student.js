import { DataTypes } from 'sequelize';

export default (connection) => {
	connection.define(
		'Student',
		{
			id: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
			},
			student_name: {
				type: DataTypes.STRING(55),
				allowNull: false,
			},
			email: {
				type: DataTypes.STRING(50),
				allowNull: false,
				unique: true,
			},
			passwordHash: {
				type: DataTypes.STRING(255),
				allowNull: false,
			},
			student_phone: {
				type: DataTypes.STRING(55),
				allowNull: false,
			},
			student_address: {
				type: DataTypes.STRING(100),
				allowNull: false,
			},
		},
		{ timestamps: true, updatedAt: false }
	);
};
