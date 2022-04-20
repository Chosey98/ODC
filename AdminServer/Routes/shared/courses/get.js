import conn from '../../../conn';
const { Course, Categories, Admin, Role } = conn.models;
export default async (req, res) => {
	const { id } = req.params;
	if (isNaN(id)) {
		return res.status(400).send({
			success: false,
			message: 'id must be a number',
		});
	}
	const course = await Course.findOne({
		where: {
			id,
		},
		attributes: {
			exclude: ['admin_id', 'category_id'],
		},
		include: [
			{
				model: Admin,
				include: [Role],
				attributes: {
					exclude: ['passwordHash', 'role_id'],
				},
			},
			Categories,
		],
	});
	if (!course) {
		return res.status(404).send({
			success: false,
			message: 'Course does not exist',
		});
	}
	return res.status(200).send({
		success: true,
		message: 'Course found successfully',
		data: course,
	});
};
