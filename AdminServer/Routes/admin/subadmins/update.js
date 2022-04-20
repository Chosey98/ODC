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
	if (!adminName || !email || !password || !phoneNumber || !roleId) {
		return res.status(400).send({
			success: false,
			message:
				'adminName, email, password, phoneNumber, roleId are optinal but at least one is required',
		});
	}
	if (adminName) {
		if (!adminName.match(/^[a-zA-Z ]{2,32}$/)) {
			return res.status(400).send({
				success: false,
				message: 'name must be alphabetic and contain 2-32 characters',
			});
		}
	}
	if (email) {
		if (
			!email.match(
				/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
			)
		) {
			return res.status(400).send({
				success: false,
				message: 'email is invalid',
			});
		}
	}
	if (phoneNumber) {
		if (!phoneNumber.match(/^[0-9]{11}$/)) {
			return res.status(400).send({
				success: false,
				message: 'phoneNumber must be numeric and contains 11 digits',
			});
		}
	}
	if (password) {
		if (
			!password.match(
				/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/
			)
		) {
			return res.status(400).send({
				success: false,
				message:
					'password must be at least 8 characters, contain at least one uppercase letter, one lowercase letter and one number',
			});
		}
	}
	if (roleId) {
		if (isNaN(roleId)) {
			return res.status(400).send({
				success: false,
				message: 'roleId must be a number',
			});
		}
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
		message: 'Sub-admin updated',
		data: updatedAdmin,
	});
};
