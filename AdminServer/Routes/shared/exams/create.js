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
	if (!courseName.match(/^[a-zA-Z ]{2,32}$/)) {
		return res.status(400).json({
			success: false,
			message:
				'Course name must be alphabetic and contain 2-32 characters',
		});
	}
	if (isNaN(numberOfQuestions)) {
		return res.status(400).json({
			success: false,
			message: 'numberOfQuestions must be a number',
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
		message: 'Exam created successfully',
		data: exam,
	});
};
