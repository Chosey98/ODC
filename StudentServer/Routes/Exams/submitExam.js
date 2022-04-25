import conn from '../../conn';

export default async (req, res) => {
	const { UserExam, Exam, Question, Revision } = conn.models;
	const { examCode } = req.body;
	if (!examCode) {
		return res.status(400).json({
			success: false,
			message: 'Exam code is required',
		});
	}
	const userExam = await UserExam.findOne({
		where: {
			exam_code: examCode,
		},
	});
	if (!userExam) {
		return res.status(400).json({
			success: false,
			message: 'Exam code is not valid',
		});
	}
	if (userExam.expired === true) {
		return res.status(400).json({
			success: false,
			message: 'Exam code is expired',
		});
	}
	if (userExam.exam_taken === true) {
		return res.status(400).json({
			success: false,
			message: 'This exam has already been taken',
		});
	}
	const revision = await Revision.findOne({
		where: {
			id: userExam.revision_id,
		},
	});
	const questions = [];
	const mark = 0;
	const questionIds = userExam.exam_questions.split(',');
	for (let question of questionIds) {
		const questionObj = await Question.findOne({
			where: {
				id: question,
			},
		});
		questions.push(questionObj);
	}
	const userAnswers = userExam.exam_answers.split(',');
	for (let i = 0; i < questions.length; i++) {
		const answer = userAnswers[i];
		if (answer === questions[i].correct_answer) {
			mark++;
		}
	}
	await revision.update({
		student_degree: mark,
	});

	await userExam.update({
		exam_taken: true,
	});
	const exam = await Exam.findOne({
		where: {
			id: userExam.exam_id,
		},
	});
	const totalMark = exam.number_of_questions;
	res.status(200).json({
		success: true,
		message: 'Exam submitted successfully',
		data: {
			userMark: mark,
			totalMark,
		},
	});
};
