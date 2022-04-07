import conn from '../../../conn';
import bcrypt from 'bcrypt';
const { Admin, Role } = conn.models;
export default async (req, res) => {
	let { email, password, name, role, phoneNumber } = req.body;
	if (!email || !password || !name || !role || !phoneNumber) {
		return res.status(400).send({
			success: false,
			message: 'email, password, name, role, phoneNumber are required',
		});
	}
	if (!email.match(/@/g)) {
		return res.status(400).send({
			success: false,
			message: 'email is invalid',
		});
	}
	const admin = await Admin.findOne({
		where: {
			email: email,
		},
	});
	if (admin) {
		return res.status(400).send({
			success: false,
			message: 'Admin with the same email already exists',
		});
	}
	role = await Role.findOne({
		where: {
			role_name: role,
		},
	});
	if (!role) {
		return res.status(400).send({
			success: false,
			message: 'Role does not exist',
		});
	}
	const newAdmin = await Admin.create({
		email: email,
		passwordHash: bcrypt.hashSync(password, 10),
		admin_name: name,
		role_id: role.id,
		admin_phone: phoneNumber,
	});
	return res.status(200).send({
		success: true,
		data: newAdmin,
	});
};
