import { DataTypes } from 'sequelize';

export default (connection) => {
	connection.define(
		'Admin',
		{
			id: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
			},
			admin_name: {
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
			admin_phone: {
				type: DataTypes.STRING(55),
				allowNull: false,
			},
			role_id: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
		},
		{
			timestamps: false,
			createdAt: true,
		}
	);
};
