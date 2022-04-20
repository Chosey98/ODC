import conn from '../../../conn';
const { Exam } = conn.models;
export default async (req, res) => {
	const { id } = req.params;
	if (isNaN(id)) {
		return res.status(400).json({
			success: false,
			message: 'id must be a number',
		});
	}
	const exams = await Exam.findAll({
		where: {
			course_id: id,
		},
	});
	return res.status(200).send({
		success: true,
		message: 'Exams found successfully',
		data: exams,
	});
};
