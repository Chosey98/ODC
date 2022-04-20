import conn from '../../../conn';
const { Role } = conn.models;
export default async (req, res) => {
	const { roleName } = req.body;
	if (!roleName) {
		return res.status(400).send({
			success: false,
			message: 'roleName is required',
		});
	}
	const role = await Role.findOne({
		where: {
			role_name: roleName,
		},
	});
	if (role) {
		return res.status(400).send({
			success: false,
			message: 'Role already exists',
		});
	}
	const newRole = await Role.create({
		role_name: roleName,
	});
	return res.status(200).send({
		success: true,
		message: 'Role added successfully',
		data: newRole,
	});
};
