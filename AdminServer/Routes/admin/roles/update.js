import conn from '../../../conn';
const { Role } = conn.models;
export default async (req, res) => {
	const { id } = req.params;
	if (isNaN(id)) {
		return res.status(400).send({
			success: false,
			message: 'id must be a number',
		});
	}
	const { roleName } = req.body;
	if (!roleName) {
		return res.status(400).send({
			success: false,
			message: 'roleName is required',
		});
	}
	if (roleName === '') {
		return res.status(400).send({
			success: false,
			message: 'roleName cannot be empty',
		});
	}
	const role = await Role.findOne({
		where: {
			id,
		},
	});
	if (!role) {
		return res.status(404).send({
			success: false,
			message: 'Role not found',
		});
	}
	if (id === 1) {
		return res.status(400).send({
			success: false,
			message: 'Cannot update super admin role',
		});
	}
	const updatedRole = await role.update({
		role_name: roleName,
	});
	return res.status(200).send({
		success: true,
		message: 'Role updated',
		data: updatedRole,
	});
};
