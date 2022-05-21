import conn from '../../conn';
import { MailService } from '@sendgrid/mail';
import { uuid } from 'uuidv4';
const sgMail = new MailService();
sgMail.setApiKey('');
const { Course, Enroll, Revision, Exam, Question } = conn.models;
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
			student_id: req.user.id,
			status: 'pending',
		},
	});
	if (enroll) {
		return res.status(400).send({
			success: false,
			message:
				'User already enrolled in a course, please check your email throughout the week to get your approval',
		});
	}
	const course = await Course.findOne({
		where: {
			id,
		},
		include: [Exam],
	});
	if (!course) {
		return res.status(404).send({
			success: false,
			message: 'Course not found',
		});
	}
	const newEnroll = await Enroll.create({
		student_id: req.user.id,
		course_id: id,
	});
	const revision = await Revision.create({
		student_id: req.user.id,
		exam_id: course.Exams[0].id,
		student_degree: null,
		enroll_id: newEnroll.id,
	});
	const questions = await Question.findAll({
		where: {
			exam_id: revision.exam_id,
		},
	});
	let examQuestions = [];
	for (let i = 0; i < Course.Exams[0].number_of_questions; i++) {
		const randomQuestionIndex = Math.floor(
			Math.random() * questions.length
		);
		examQuestions.push(questions[randomQuestionIndex].id);
		n;
		questions = questions.splice(randomQuestionIndex, 1);
	}
	const userExam = await UserExam.create({
		revision_id: revision.id,
		exam_code: uuid(),
		exam_questions: examQuestions.join(', '),
	});
	sgMail.send({
		to: '',
		from: '',
		subject: 'Enrollment code',
		html: `Your enrollment code is <h1>${userExam.exam_code}</h1>`,
	});
	return res.status(200).send({
		success: true,
		message: 'Enrolled successfully',
		data: {
			enroll: newEnroll,
			revision,
			userExam,
		},
	});
};
