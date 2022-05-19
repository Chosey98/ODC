import { DataTypes } from 'sequelize';

export default (connection) => {
	connection.define(
		'Categories',
		{
			id: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
			},
			category_name: {
				type: DataTypes.STRING(200),
				allowNull: false,
			},
			image_url: {
				type: DataTypes.STRING(255),
				allowNull: false,
			},
		},
		{
			timestamps: false,
			tableName: 'Categories',
		}
	);
};
