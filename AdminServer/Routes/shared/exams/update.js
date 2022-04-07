import conn from '../../../conn';
const { Exam } = conn.models;
export default async (req, res) => {
	const { id } = req.params;
	const { courseId, numberOfQuestions } = req.body;
	if (isNaN(id)) {
		return res.status(400).json({
			success: false,
			message: 'id must be a name',
		});
	}
	if (!courseId && !numberOfQuestions) {
		return res.status(400).json({
			success: false,
			message: 'courseId and numberOfQuestions are required',
		});
	}
	const exam = await Exam.findOne({
		where: {
			id,
		},
	});
	if (!exam) {
		return res.status(404).json({
			message: 'Exam not found',
		});
	}
	const updatedExam = await exam.update({
		course_id: !courseId ? exam.course_id : courseId,
		number_of_questions: !numberOfQuestions
			? exam.number_of_questions
			: numberOfQuestions,
	});
	return res.status(200).send({
		success: true,
		data: updatedExam,
	});
};
