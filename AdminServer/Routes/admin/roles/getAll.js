import conn from '../../../conn';
const { Role } = conn.models;
export default async (req, res) => {
	const roles = await Role.findAll();
	return res.status(200).send({
		success: true,
		message: 'Roles found',
		data: roles,
	});
};
