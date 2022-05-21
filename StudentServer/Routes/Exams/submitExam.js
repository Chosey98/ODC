import conn from '../../conn';

export default async (req, res) => {
	const { UserExam, Exam, Question, Revision, Enroll } = conn.models;
	const { answers } = req.body;
	const { code } = req.params;
	if (!code) {
		return res.status(400).json({
			success: false,
			message: 'code is required',
		});
	}
	if (!answers) {
		return res.status(400).json({
			success: false,
			message: 'answers are required',
		});
	}
	const userExam = await UserExam.findOne({
		where: {
			exam_code: code,
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
	if (answers.length < userExam.exam_questions.split(', ').length) {
		return res.status(400).json({
			success: false,
			message: 'You have not answered all the questions',
		});
	}
	await userExam.update({
		exam_answers: answers.join(', '),
	});
	const revision = await Revision.findOne({
		where: {
			id: userExam.revision_id,
		},
	});
	console.log('rev');
	const questions = [];
	let mark = 0;
	const questionIds = userExam.exam_questions.split(', ');
	for (let question of questionIds) {
		const questionObj = await Question.findOne({
			where: {
				id: question,
			},
		});
		console.log('ques');
		questions.push(questionObj);
	}
	const userAnswers = userExam.exam_answers.split(', ');
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
			id: revision.exam_id,
		},
	});
	console.log('ex');
	const totalMark = exam.number_of_questions;
	let status = 'hr_pending';
	if (mark >= totalMark * 0.6) {
		status = 'hr_pending';
	} else {
		status = 'rejected';
	}
	const enroll = await Enroll.findOne({
		where: {
			student_id: req.user.id,
			status: 'exam_pending',
		},
	});
	await enroll.update({
		where: {
			status,
		},
	});
	res.status(200).json({
		success: true,
		message: 'Exam submitted successfully',
		data: {
			userMark: mark,
			status,
		},
	});
};
