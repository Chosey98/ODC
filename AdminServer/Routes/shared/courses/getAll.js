import conn from '../../../conn';
const { Course, Admin, Categories, Role } = conn.models;
export default async (req, res) => {
	const courses = await Course.findAll({
		attributes: {
			exclude: ['admin_id', 'category_id'],
		},
		include: [
			{
				model: Admin,
				include: [Role],
				attributes: {
					exclude: ['passwordHash'],
				},
			},
			Categories,
		],
	});
	return res.status(200).send({
		success: true,
		message: 'Courses found successfully',
		data: courses,
	});
};
