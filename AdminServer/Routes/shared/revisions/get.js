import conn from '../../../conn';
const { Revision, UserExam, Question } = conn.models;

export default async (req, res) => {
	{
		const { id } = req.params;
		if (isNaN(id)) {
			return res.status(400).send({
				success: false,
				message: 'id must be a number',
			});
		}
		const revision = await Revision.findOne({
			where: {
				id,
			},
			include: [UserExam],
		});
		const questionsArray = revision.UserExam.exam_questions.split(',');
		let questions = await Question.findAll({});
		questions = questions.filter((question) =>
			questionsArray.includes(question.id)
		);
		revision.questions = questions;
		return res.status(200).send({
			success: true,
			message: 'Revision found',
			data: revision,
		});
	}
};
