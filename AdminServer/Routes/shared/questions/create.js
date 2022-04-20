import conn from '../../../conn';
const { Exam, Question, Task } = conn.models;
export default async (req, res) => {
	const { examId, questionsArray } = req.body;
	if (
		!examId ||
		!questionsArray ||
		!Array.isArray(questionsArray) ||
		questionsArray.length === 0
	) {
		return res.status(400).json({
			success: false,
			message: 'examId and questionsArray are required',
		});
	}
	if (isNaN(examId)) {
		return res.status(400).json({
			success: false,
			message: 'examId must be a number',
		});
	}
	const exam = await Exam.findOne({
		where: {
			id: examId,
		},
	});
	if (!exam) {
		return res.status(404).json({
			success: false,
			message: 'Exam not found',
		});
	}
	const questions = [];
	for (let questionBody of questionsArray) {
		if (!questionBody.question || !questionBody.questionMark) {
			return res.status(400).json({
				success: false,
				message: 'question and questionMark are required',
			});
		}
		if (questionBody.isTask !== undefined && questionBody.isTask == true) {
			if (!questionBody.taskUrl) {
				return res.status(400).json({
					success: false,
					message: 'taskUrl is required',
				});
			}
			const task = await Task.create({
				task_url: questionBody.taskUrl,
			});
			const newQuestion = await Question.create({
				question: questionBody.question,
				question_mark: questionBody.questionMark,
				isTask: true,
				task_id: task.id,
				exam_id: exam.id,
			});
			questions.push(newQuestion);
			continue;
		}
		if (!questionBody.correctAnswer) {
			return res.status(400).json({
				success: false,
				message: 'correctAnswer is required',
			});
		}
		const newQuestion = await Question.create({
			question: questionBody.question,
			question_mark: questionBody.questionMark,
			answer_1: !questionBody.answer1 ? null : questionBody.answer1,
			answer_2: !questionBody.answer2 ? null : questionBody.answer2,
			answer_3: !questionBody.answer3 ? null : questionBody.answer3,
			answer_4: !questionBody.answer4 ? null : questionBody.answer4,
			correct_answer: questionBody.correctAnswer,
			exam_id: exam.id,
		});
		questions.push(newQuestion);
		continue;
	}
	return res.status(200).send({
		success: true,
		message: 'Questions created successfully',
		data: questions,
	});
};
