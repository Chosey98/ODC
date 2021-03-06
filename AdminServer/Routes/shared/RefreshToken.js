import conn from '../../conn';
import jwt from 'jsonwebtoken';
const { ExpiredToken } = conn.models;
export default async (req, res) => {
	if (req.user.refresh === undefined) {
		return res.status(400).send({
			success: false,
			message: 'Token supplied is not refresh token',
		});
	}
	const query = await ExpiredToken.findOne({
		where: {
			token: req.headers.authorization.split(' ')[1],
		},
	});
	if (query) {
		return res.status(400).send({
			success: false,
			message: 'Token is expired already',
		});
	}
	const access_token = jwt.sign({ id: req.user.id }, process.env.SECRET_KEY, {
		expiresIn: '1h',
	});
	const refresh_token = jwt.sign(
		{ id: req.user.id, refresh: true },
		process.env.SECRET_KEY,
		{ expiresIn: '7d' }
	);
	await ExpiredToken.create({
		token: req.headers.authorization.split(' ')[1],
		type: 'refresh',
		eat: req.user.exp,
	});
	return res.status(200).send({
		success: true,
		message: 'Token refreshed',
		data: {
			access_token,
			refresh_token,
		},
	});
};
