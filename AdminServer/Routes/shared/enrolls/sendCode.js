import conn from '../../../conn';
import { uuid } from 'uuidv4';
const { Course, Enroll, Student, Revision, UserExam, Question, Exam } =
	conn.models;
export default async (req, res) => {
	const { id } = req.params;
	if (isNaN(id)) {
		return res.status(400).send({
			success: false,
			message: 'id must be a number',
		});
	}
	const enroll = await Enroll.findOne({
		where: {
			id,
			status: 'pending',
		},
		include: [
			Student,
			{
				model: Course,
				include: [Exam],
			},
		],
	});
	if (!enroll) {
		return res.status(404).send({
			success: false,
			message: 'Enrollment not found',
		});
	}
	let revisions = [];
	let exams = [];
	for (const exam of enroll.Course.Exams) {
		const revision = await Revision.create({
			student_id: enroll.student_id,
			exam_id: exam.id,
			student_degree: null,
			enroll_id: enroll.id,
		});
		revisions.push(revision);
		const questions = await Question.findAll({
			where: {
				exam_id: revision.exam_id,
			},
		});
		let examQuestions = [];
		for (let i = 0; i < exam.number_of_questions; i++) {
			const randomQuestionIndex = Math.floor(
				Math.random() * questions.length
			);
			examQuestions.push(questions[randomQuestionIndex].id);
			questions = questions.splice(randomQuestionIndex, 1);
		}
		const userExam = await UserExam.create({
			revision_id: revision.id,
			exam_code: uuid(),
			exam_questions: examQuestions.join(', '),
		});
		exams.push(userExam);
	}
	return res.status(200).send({
		success: true,
		data: {
			revisions,
			exams,
		},
	});
};
