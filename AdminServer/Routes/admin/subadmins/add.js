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
	if (!phoneNumber.match(/^[0-9]{11}$/)) {
		return res.status(400).send({
			success: false,
			message: 'phoneNumber must be numeric and contains 11 digits',
		});
	}
	if (
		!password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/)
	) {
		return res.status(400).send({
			success: false,
			message:
				'password must be at least 8 characters, contain at least one uppercase letter, one lowercase letter and one number',
		});
	}
	if (!name.match(/^[a-zA-Z ]{2,32}$/)) {
		return res.status(400).send({
			success: false,
			message: 'name must be alphabetic and contain 2-32 characters',
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
		message: 'Admin added successfully',
		data: newAdmin,
	});
};
