import conn from '../conn';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
const { Student } = conn.models;

export default async (req, res) => {
	const { name, email, password, phone, address } = req.body;
	if (!name || !email || !password || !phone || !address) {
		return res.status(400).send({
			success: false,
			message: 'name, email, password, phone, address are required',
		});
	}
	const query = await Student.findOne({
		where: {
			email: email,
		},
	});
	if (query) {
		return res.status(400).send({
			success: false,
			message: 'Email already exists',
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
	if (!address.match(/^[a-zA-Z0-9 ]{12,}$/)) {
		return res.status(400).send({
			success: false,
			message:
				'address must be alphanumeric and contain at least 12 characters',
		});
	}
	const passwordHash = bcrypt.hashSync(password, 10);
	const newStudent = await Student.create({
		student_name: name,
		email: email,
		passwordHash: passwordHash,
		student_phone: phone,
		student_address: address,
	});
	const access_token = jwt.sign(
		{
			id: newStudent.id,
		},
		process.env.SECRET_KEY,
		{
			expiresIn: '1h',
		}
	);
	const refresh_token = jwt.sign(
		{
			id: newStudent.id,
			refresh: true,
		},
		process.env.SECRET_KEY,
		{
			expiresIn: '7d',
		}
	);
	return res.status(200).send({
		success: true,
		message: 'Register successful',
		data: { student: newStudent, access_token, refresh_token },
	});
};
