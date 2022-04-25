import conn from '../../conn';
const { Exam, Course } = conn.models;
export default async (req, res) => {
	const exams = await Exam.findAll({
		where: {
			course_id: req.params.id,
		},
	});
	return res.status(200).send({
		success: true,
		message: 'Exams fetched successfully',
		data: exams,
	});
};
