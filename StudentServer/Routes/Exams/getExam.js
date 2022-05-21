import conn from '../../conn';
const { Question, UserExam } = conn.models;
export default async (req, res) => {
	const { code } = req.params;
	if (isNaN(code)) {
		return res.status(400).send({
			success: false,
			message: 'code must be a number',
		});
	}
	const userExam = await UserExam.findOne({
		where: {
			exam_code: code,
		},
	});
	if (!userExam) {
		return res.status(400).send({
			success: false,
			message: 'Exam code is not valid',
		});
	}
	if (userExam.expired === true) {
		return res.status(400).send({
			success: false,
			message: 'Exam code is expired',
		});
	}
	if (userExam.exam_taken === true) {
		return res.status(400).send({
			success: false,
			message: 'This exam has already been taken',
		});
	}
	if (userExam.eat === '') {
		await userExam.update({
			eat: new Date().getTime() + 60 * 60 * 1000,
		});
	}
	const questions = [];
	const questionIds = userExam.exam_questions.split(', ');
	for (let question of questionIds) {
		const questionObj = await Question.findOne({
			where: {
				id: question,
			},
		});
		if (questionObj.isTask === false) {
			delete questionObj.dataValues.isTask;
			delete questionObj.dataValues.task_id;
		} else {
			delete questionObj.dataValues.answer1;
			delete questionObj.dataValues.answer2;
			delete questionObj.dataValues.answer3;
			delete questionObj.dataValues.answer4;
			delete questionObj.dataValues.correct_answer;
		}
		questions.push(questionObj);
	}

	return res.status(200).send({
		success: true,
		message: 'Exam fetched successfully',
		data: questions,
	});
};
