import conn from '../../../conn';
const { Role, Admin } = conn.models;
export default async (req, res) => {
	const { roleName } = req.body;
	if (roleName) {
		const role = await Role.findOne({
			where: {
				role_name: roleName,
			},
		});
		if (!role) {
			return res.status(400).send({
				success: false,
				message: 'Role does not exist',
			});
		}
		const admins = await Admin.findAll({
			where: {
				role_id: role.id,
			},
			include: [Role],
			attributes: {
				exclude: ['passwordHash'],
			},
		});
		return res.status(200).send({
			success: true,
			data: admins,
		});
	}
	const admins = await Admin.findAll({
		include: Role,
		attributes: {
			exclude: ['passwordHash'],
		},
	});
	res.status(200).send({
		sucess: true,
		data: admins.filter((admin) => admin.Role.role_name !== 'admin'),
	});
};
