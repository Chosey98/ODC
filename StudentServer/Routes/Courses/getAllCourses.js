import conn from '../../conn';
const { Course, Categories, Admin } = conn.models;
export default async (req, res) => {
	const courses = await Course.findAll({
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
	return res.status(200).send({
		success: true,
		message: 'All courses fetched successfully',
		data: courses,
	});
};
