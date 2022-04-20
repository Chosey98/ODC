import conn from '../../../conn';
const { Enroll, Student, Course, Admin, Categories, Role } = conn.models;
export default async (req, res) => {
	const { id } = req.params;
	if (isNaN(id)) {
		return res.status(400).send({
			success: false,
			message: 'id must be a number',
		});
	}
	const enroll = await Enroll.findOne({
		where: {
			id,
		},
		include: [
			{
				model: Student,
				attributes: {
					exclude: ['passwordHash'],
				},
			},
			{
				model: Course,
				include: [
					{
						model: Admin,
						include: [Role],
						attributes: { exclude: ['role_id'] },
					},
					Categories,
				],
				attributes: {
					exclude: ['admin_id', 'category_id'],
				},
			},
		],
		attributes: {
			exclude: ['student_id', 'course_id'],
		},
	});
	return res.status(200).send({
		success: true,
		message: 'Enroll found successfully',
		data: enroll,
	});
};
