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
	if (id === 1) {
		return res.status(400).send({
			success: false,
			message: 'Cannot delete this role',
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
	await role.destroy();
	return res.status(200).send({
		success: true,
		message: 'Role deleted successfully',
	});
};
