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
