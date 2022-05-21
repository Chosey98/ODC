import conn from '../../conn';
import { uuid } from 'uuidv4';
import nodemailer from 'nodemailer';
import { Op } from 'sequelize';
const { Course, Enroll, Revision, Exam, Question, UserExam } = conn.models;
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
			student_id: req.user.dataValues.id,
			status: { [Op.not]: ['hr_pending', 'exam_pending'] },
		},
	});
	if (enroll) {
		if (enroll.status === 'rejected') {
			return res.status(400).send({
				success: false,
				message: 'Your request has been already been rejected',
			});
		} else {
			return res.status(400).send({
				success: false,
				message:
					'User already enrolled in a course, please check your email throughout the week to get your approval',
			});
		}
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
		student_id: req.user.dataValues.id,
		course_id: id,
	});
	console.log(course.Exams[0]);
	const revision = await Revision.create({
		student_id: req.user.dataValues.id,
		exam_id: course.Exams[0].id,
		student_degree: null,
		enroll_id: newEnroll.id,
	});
	let questions = await Question.findAll({
		where: {
			exam_id: revision.exam_id,
		},
	});
	let examQuestions = [];
	for (let i = 0; i < course.Exams[0].number_of_questions; i++) {
		const randomQuestionIndex = Math.floor(
			Math.random() * questions.length
		);
		examQuestions.push(questions[randomQuestionIndex].id);
		questions = questions.filter(
			(question) => question.id !== questions[randomQuestionIndex].id
		);
	}
	const userExam = await UserExam.create({
		revision_id: revision.id,
		exam_code: req.helper.generateToken(),
		exam_id: course.Exams[0].id,
		exam_questions: examQuestions.join(', '),
		exam_answers: '',
		eat: '',
	});
	let transporter = nodemailer.createTransport({
		service: 'gmail',
		auth: {
			user: process.env.EMAIL,
			pass: process.env.PASSWORD,
		},
	});
	let mailOptions = {
		from: `ODC Academy <${process.env.EMAIL}`,
		to: req.user.dataValues.email,
		subject: 'Course Enrollment',
		text: `Your course enrollment code is ${userExam.exam_code}`,
	};
	await transporter.sendMail(mailOptions);
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
