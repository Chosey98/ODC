import conn from '../../../conn';
import { Op } from 'sequelize';
const { Admin } = conn.models;
export default async (req, res) => {
	const { id } = req.params;
	if (isNaN(id)) {
		return res.status(400).send({
			success: false,
			message: 'id must be a number',
		});
	}
	const admin = await Admin.findOne({
		where: {
			id,
		},
		attributes: {
			exclude: ['passwordHash'],
		},
	});
	if (!admin) {
		return res.status(400).send({
			success: false,
			message: 'Subadmin does not exist',
		});
	}
	if (admin.role_id === 1) {
		return res.status(400).send({
			success: false,
			message: 'User is not a sub admin',
		});
	}
	return res.status(200).send({
		success: true,
		data: admin,
	});
};
