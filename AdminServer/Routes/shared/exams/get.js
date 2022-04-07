import conn from '../../../conn';
const { Exam, Course, Question, Role, Admin, Categories } = conn.models;
export default async (req, res) => {
	const { id } = req.params;
	if (isNaN(id)) {
		return res.status(400).json({
			success: false,
			message: 'id must be a number',
		});
	}
	const exam = await Exam.findOne({
		where: {
			id,
		},
		include: [
			{
				model: Course,
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
			},
			{ model: Question, attributes: ['exam_id'] },
		],
		attributes: {
			exclude: ['course_id'],
		},
	});
	if (!exam) {
		return res.status(404).send({
			success: false,
			message: 'Exam not found',
		});
	}
	return res.status(200).send({
		success: true,
		data: exam,
	});
};
