import conn from '../../../conn';
const { Question } = conn.models;

export default async (req, res) => {
	const { id } = req.params;
	const {
		questionContent,
		questionMark,
		isTask,
		taskId,
		answer1,
		answer2,
		answer3,
		answer4,
		correctAnswer,
		examId,
	} = req.body;
	if (isNaN(id)) {
		return res.status(400).send({
			success: false,
			message: 'id must be a number',
		});
	}
	if (
		!questionContent &&
		!questionMark &&
		!isTask &&
		!taskId &&
		!answer1 &&
		!answer2 &&
		!answer3 &&
		!answer4 &&
		!correctAnswer &&
		!examId
	) {
		return res.status(400).send({
			success: false,
			message:
				'questionContent, questionMark, isTask, taskId, answer1, answer2, answer3, answer4, correctAnswer, examId are required',
		});
	}
	if (isTask && !taskId) {
		return res.status(400).send({
			success: false,
			message: 'taskId is required',
		});
	}
	if (!isTask && taskId) {
		return res.status(400).send({
			success: false,
			message: 'isTask is set to false yet there is a taskId',
		});
	}
	if (isTask && taskId && isNaN(taskId)) {
		return res.status(400).send({
			success: false,
			message: 'taskId must be a number',
		});
	}
	if (questionContent) {
		if (questionContent.length > 500) {
			return res.status(400).send({
				success: false,
				message: 'questionContent must be less than 500 characters',
			});
		}
	}
	if (questionMark) {
		if (isNaN(questionMark)) {
			return res.status(400).send({
				success: false,
				message: 'questionMark must be a number',
			});
		}
	}
	if (answer1) {
		if (answer1.length > 500) {
			return res.status(400).send({
				success: false,
				message: 'answer1 must be less than 500 characters',
			});
		}
	}
	if (answer2) {
		if (answer2.length > 500) {
			return res.status(400).send({
				success: false,
				message: 'answer2 must be less than 500 characters',
			});
		}
	}
	if (answer3) {
		if (answer3.length > 500) {
			return res.status(400).send({
				success: false,
				message: 'answer3 must be less than 500 characters',
			});
		}
	}
	if (answer4) {
		if (answer4.length > 500) {
			return res.status(400).send({
				success: false,
				message: 'answer4 must be less than 500 characters',
			});
		}
	}
	if (correctAnswer) {
		if (
			correctAnswer !== 'answer1' ||
			correctAnswer !== 'answer2' ||
			correctAnswer !== 'answer3' ||
			correctAnswer !== 'answer4'
		) {
			return res.status(400).send({
				success: false,
				message:
					'correctAnswer must be answer1 or answer2 or answer3 or answer4',
			});
		}
	}
	if (examId) {
		if (isNaN(examId)) {
			return res.status(400).send({
				success: false,
				message: 'examId must be a number',
			});
		}
	}
	const question = await Question.findOne({
		where: {
			id,
		},
	});
	if (!question) {
		return res.status(404).send({
			success: false,
			message: 'Question not found',
		});
	}
	const updatedQuestion = await question.update({
		question: !questionContent ? question.question : questionContent,
		question_mark: !questionMark ? question.question_mark : questionMark,
		is_task: !isTask ? question.is_task : isTask,
		task_id: !taskId ? question.task_id : taskId,
		answer_1: !answer1 ? question.answer_1 : answer1,
		answer_2: !answer2 ? question.answer_2 : answer2,
		answer_3: !answer3 ? question.answer_3 : answer3,
		answer_4: !answer4 ? question.answer_4 : answer4,
		correct_answer: !correctAnswer
			? question.correct_answer
			: correctAnswer,
		exam_id: !examId ? question.exam_id : examId,
	});
	return res.status(200).send({
		success: true,
		data: updatedQuestion,
	});
};
