import conn from '../../../conn';
const { Exam } = conn.models;
export default async (req, res) => {
	const { id } = req.params;
	const exams = await Exam.findAll({
		where: {
			course_id: id,
		},
	});
	return res.status(200).send({
		success: true,
		data: exams,
	});
};
