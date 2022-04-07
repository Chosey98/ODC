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
			role_id: {
				[Op.ne]: 1,
			},
		},
	});
	if (!admin) {
		return res.status(404).send({
			success: false,
			message: 'Subadmin not found',
		});
	}
	await admin.destroy();
	return res.status(200).send({
		success: true,
		message: 'Subadmin deleted',
	});
};
