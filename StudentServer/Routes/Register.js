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
	if (password.length < 8) {
		return res.status(400).send({
			success: false,
			message: 'Password must be at least 8 characters',
		});
	}
	if (password.length > 32) {
		return res.status(400).send({
			success: false,
			message: 'Password cannot be more than 32 characters',
		});
	}
	const upperCase = new RegExp(/[A-Z]/g);
	if (upperCase.test(password) == false) {
		return res.status(400).send({
			success: false,
			message: 'Password must contain at least one uppercase letter',
		});
	}
	const lowerCase = new RegExp(/[a-z]/g);
	if (lowerCase.test(password) == false) {
		return res.status(400).send({
			success: false,
			message: 'Password must contain at least one lowercase letter',
		});
	}
	const number = new RegExp(/[0-9]/g);
	if (number.test(password) == false) {
		return res.status(400).send({
			success: false,
			message: 'Password must contain at least one number',
		});
	}
	const special = new RegExp(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/g);
	if (special.test(password) == false) {
		return res.status(400).send({
			success: false,
			message: 'Password must contain at least one special character',
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
		data: { newStudent, access_token, refresh_token },
	});
};
