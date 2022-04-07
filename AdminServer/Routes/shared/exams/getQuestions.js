import conn from '../../../conn';
const { Question } = conn.models;
export default async (req, res) => {
	const { id } = req.params;
	if (isNaN(id)) {
		return res.status(400).json({
			success: false,
			message: 'id must be a number',
		});
	}
	const questions = await Question.findAll({
		where: {
			exam_id: id,
		},
	});
	return res.status(200).send({
		success: true,
		data: questions,
	});
};
