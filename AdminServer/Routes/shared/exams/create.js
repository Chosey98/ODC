import conn from '../../../conn';
const { Exam, Course } = conn.models;
export default async (req, res) => {
	const { courseName, numberOfQuestions } = req.body;
	if (!courseName || !numberOfQuestions) {
		return res.status(400).json({
			success: false,
			message: 'All fields are required',
		});
	}
	const course = await Course.findOne({
		where: {
			course_name: courseName,
		},
	});
	if (!course) {
		return res.status(404).json({
			message: 'Course nor found',
		});
	}
	const exam = await Exam.create({
		course_id: course.id,
		number_of_questions: numberOfQuestions,
	});
	return res.status(200).send({
		success: true,
		data: exam,
	});
};
