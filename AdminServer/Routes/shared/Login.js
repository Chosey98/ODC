import conn from '../../conn';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
const { Admin } = conn.models;
export default async (req, res) => {
	const { email, password } = req.body;
	if (!email || !password) {
		return res.status(400).send({
			success: false,
			message: 'Email and password are required',
		});
	}
	const query = await Admin.findOne({
		where: {
			email: email,
		},
	});
	if (!query) {
		return res.status(400).send({
			success: false,
			message: 'Email or password is incorrect',
		});
	}
	if (bcrypt.compareSync(password, query.passwordHash)) {
		const access_token = jwt.sign(
			{ id: query.id },
			process.env.SECRET_KEY,
			{ expiresIn: '1h' }
		);
		const refresh_token = jwt.sign(
			{ id: query.id, refresh: true },
			process.env.SECRET_KEY,
			{ expiresIn: '7d' }
		);
		return res.status(200).send({
			success: true,
			message: 'Login successful',
			data: {
				access_token,
				refresh_token,
			},
		});
	}

	return res.status(400).send({
		success: false,
		message: 'Email or password is incorrect',
	});
};
