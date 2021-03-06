import conn from '../../conn';
const { Course, Categories, Admin } = conn.models;
export default async (req, res) => {
	const { id } = req.params;
	const course = await Course.findOne({
		where: {
			id,
		},
		attributes: {
			exclude: ['admin_id', 'category_id'],
		},
		include: [
			Categories,
			{
				model: Admin,
				attributes: {
					exclude: ['passwordHash', 'role_id', 'admin_phone', 'id'],
				},
			},
		],
	});
	if (!course) {
		return res.status(404).json({
			success: false,
			message: 'Course not found',
		});
	}
	return res.status(200).send({
		success: true,
		message: 'Course fetched successfully',
		data: course,
	});
};
