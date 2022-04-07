import conn from '../../../conn';
import bcrypt from 'bcrypt';
import { Op } from 'sequelize';
const { Admin } = conn.models;
export default async (req, res) => {
	const { id } = req.params;
	const { adminName, email, password, phoneNumber, roleId } = req.body;
	if (isNaN(id)) {
		return res.status(400).send({
			success: false,
			message: 'id must be a number',
		});
	}
	if (!adminName && !email && !password && !phoneNumber && !roleId) {
		return res.status(400).send({
			success: false,
			message:
				'adminName, email, password, phoneNumber, roleId are required',
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
			message: 'Sub-admin not found',
		});
	}
	const updatedAdmin = await admin.update({
		admin_name: !adminName ? admin.admin_name : adminName,
		email: !email ? admin.email : email,
		passwordHash: !password
			? admin.passwordHash
			: await bcrypt.hash(password, 10),
		admin_phone: !phoneNumber ? admin.admin_phone : phoneNumber,
		role_id: !roleId ? admin.role_id : roleId,
	});
	delete updatedAdmin.dataValues.passwordHash;
	return res.status(200).send({
		success: true,
		data: updatedAdmin,
	});
};
