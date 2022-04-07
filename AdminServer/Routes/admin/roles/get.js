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
	const role = await Role.findOne({
		where: {
			id,
		},
	});
	if (!role) {
		return res.status(400).send({
			success: false,
			message: 'Role does not exist',
		});
	}
	return res.status(200).send({
		success: true,
		data: role,
	});
};
